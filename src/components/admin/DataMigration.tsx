'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface MigrationStatus {
  inProgress: boolean;
  lastRun: Date | null;
  logs: string[];
  error: string | null;
  success: boolean;
}

const availableTables = [
  { name: 'users', label: 'Users' },
  { name: 'categories', label: 'Categories' },
  { name: 'stores', label: 'Stores' },
  { name: 'promo_codes', label: 'Promo Codes' },
  { name: 'store_blogs', label: 'Store Blogs' },
  { name: 'category_promo_codes', label: 'Category Promo Codes' },
  { name: 'subscribers', label: 'Subscribers' },
];

export default function DataMigration() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTables, setSelectedTables] = useState<string[]>([]);
  const [resetDatabase, setResetDatabase] = useState(false);
  const [destinationEnv, setDestinationEnv] = useState<'local' | 'prod'>('local');
  const [status, setStatus] = useState<MigrationStatus>({
    inProgress: false,
    lastRun: null,
    logs: [],
    error: null,
    success: false
  });

  const fetchStatus = async () => {
    try {
      const response = await fetch('/api/admin/migration-status');
      const data = await response.json();
      setStatus(data);
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
        body: JSON.stringify({
          tables: selectedTables.length > 0 ? selectedTables : ['all'],
          resetDatabase,
          destinationEnv,
        }),
      });
      const data = await response.json();
      
      if (data.error) {
        setStatus(prev => ({
          ...prev,
          error: data.error,
          inProgress: false,
        }));
      } else {
        // Fetch status once after starting migration
        await fetchStatus();
      }
    } catch (error) {
      console.error('Error starting migration:', error);
      setStatus(prev => ({
        ...prev,
        error: 'Failed to start migration',
        inProgress: false,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // Only fetch status when component mounts
  useEffect(() => {
    fetchStatus();
  }, []);

  if (!session?.user?.email?.includes('tyler.e.stauss@gmail.com')) {
    return null;
  }

  const handleTableChange = (tableName: string) => {
    setSelectedTables(prev => {
      if (prev.includes(tableName)) {
        return prev.filter(t => t !== tableName);
      } else {
        return [...prev, tableName];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedTables.length === availableTables.length) {
      setSelectedTables([]);
    } else {
      setSelectedTables(availableTables.map(t => t.name));
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Data Migration</h2>
        
        {/* Environment Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Destination Environment
          </label>
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="environment"
                value="local"
                checked={destinationEnv === 'local'}
                onChange={(e) => setDestinationEnv(e.target.value as 'local' | 'prod')}
              />
              <span className="ml-2">Local Database</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="environment"
                value="prod"
                checked={destinationEnv === 'prod'}
                onChange={(e) => setDestinationEnv(e.target.value as 'local' | 'prod')}
              />
              <span className="ml-2">Production Database</span>
            </label>
          </div>
        </div>

        {/* Table Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Tables to Migrate
          </label>
          <div className="space-y-2">
            {availableTables.map((table) => (
              <label key={table.name} className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={selectedTables.includes(table.name)}
                  onChange={() => handleTableChange(table.name)}
                />
                <span className="ml-2">{table.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Reset Database Option */}
        <div className="mb-6">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={resetDatabase}
              onChange={(e) => setResetDatabase(e.target.checked)}
            />
            <span className="ml-2">Reset Database Before Migration</span>
          </label>
        </div>

        {/* Migration Button */}
        <div className="flex justify-between items-center">
          <button
            className={`px-4 py-2 rounded ${
              isLoading || status.inProgress
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
            onClick={startMigration}
            disabled={isLoading || status.inProgress}
          >
            {isLoading ? 'Starting...' : status.inProgress ? 'Migration in Progress...' : 'Start Migration'}
          </button>
        </div>
      </div>

      {/* Migration Status */}
      {(status.logs.length > 0 || status.error) && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Migration Status</h3>
          {status.error && (
            <div className="text-red-600 mb-4">
              Error: {status.error}
            </div>
          )}
          <div className="bg-gray-100 p-4 rounded max-h-96 overflow-y-auto">
            {status.logs.map((log, index) => (
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