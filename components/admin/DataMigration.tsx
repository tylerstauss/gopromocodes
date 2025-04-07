'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface MigrationStatus {
  isRunning: boolean;
  progress: number;
  logs: string[];
  error?: string;
}

interface MigrationFormData {
  tables: string[];
  resetDatabase: boolean;
  destinationEnv: 'local' | 'prod';
}

const AVAILABLE_TABLES = [
  'users',
  'categories',
  'stores',
  'promo_codes',
  'store_blogs',
  'category_promo_codes',
  'subscribers',
  'click_logs'
];

export default function DataMigration() {
  const { data: session, status: sessionStatus } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [migrationStatus, setMigrationStatus] = useState<MigrationStatus>({
    isRunning: false,
    progress: 0,
    logs: [],
  });
  const [formData, setFormData] = useState<MigrationFormData>({
    tables: ['all'],
    resetDatabase: false,
    destinationEnv: 'local'
  });

  const fetchStatus = async () => {
    try {
      const response = await fetch('/api/admin/migration-status');
      const data = await response.json();
      setMigrationStatus(data);
    } catch (error) {
      console.error('Error fetching migration status:', error);
    }
  };

  const startMigration = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/migrate-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      
      if (data.error) {
        setMigrationStatus(prev => ({
          ...prev,
          error: data.error,
          isRunning: false,
        }));
      } else {
        // Fetch status once after starting migration
        await fetchStatus();
      }
    } catch (error) {
      console.error('Error starting migration:', error);
      setMigrationStatus(prev => ({
        ...prev,
        error: 'Failed to start migration',
        isRunning: false,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // Only fetch status when component mounts
  useEffect(() => {
    fetchStatus();
  }, []);

  // Show loading state while session is being fetched
  if (sessionStatus === 'loading') {
    return <div className="animate-pulse bg-gray-200 h-32 rounded"></div>;
  }

  // Check for session and admin status
  if (!session?.user?.isAdmin) {
    console.log('User not authorized:', session?.user);
    return null;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Data Migration</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Migration Options</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Destination Database
          </label>
          <select
            value={formData.destinationEnv}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              destinationEnv: e.target.value as 'local' | 'prod'
            }))}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="local">Local Database</option>
            <option value="prod">Production Database</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tables to Migrate
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.tables.includes('all')}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFormData(prev => ({ ...prev, tables: ['all'] }));
                  } else {
                    setFormData(prev => ({ ...prev, tables: [] }));
                  }
                }}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <span className="ml-2">All Tables</span>
            </label>
            {AVAILABLE_TABLES.map((table) => (
              <label key={table} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.tables.includes(table)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData(prev => ({
                        ...prev,
                        tables: prev.tables.filter(t => t !== 'all').concat(table)
                      }));
                    } else {
                      setFormData(prev => ({
                        ...prev,
                        tables: prev.tables.filter(t => t !== table)
                      }));
                    }
                  }}
                  disabled={formData.tables.includes('all')}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <span className="ml-2">{table.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.resetDatabase}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                resetDatabase: e.target.checked
              }))}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <span className="ml-2">Reset destination database before migration</span>
          </label>
        </div>
      </div>

      <button
        onClick={startMigration}
        disabled={isLoading || migrationStatus.isRunning}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {isLoading ? 'Starting...' : 'Start Migration'}
      </button>

      {migrationStatus.error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {migrationStatus.error}
        </div>
      )}

      {migrationStatus.isRunning && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${migrationStatus.progress}%` }}
            ></div>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Progress: {migrationStatus.progress}%
          </p>
        </div>
      )}

      {migrationStatus.logs.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Migration Logs:</h3>
          <div className="bg-gray-100 p-4 rounded max-h-96 overflow-y-auto">
            {migrationStatus.logs.map((log, index) => (
              <div key={index} className="text-sm font-mono">
                {log}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 