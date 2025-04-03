'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface MigrationStatus {
  isRunning: boolean;
  progress: number;
  logs: string[];
  error?: string;
}

export default function DataMigration() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<MigrationStatus>({
    isRunning: false,
    progress: 0,
    logs: [],
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
      });
      const data = await response.json();
      
      if (data.error) {
        setStatus(prev => ({
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
      setStatus(prev => ({
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

  if (!session?.user?.email?.includes('tylerstauss@gmail.com')) {
    return null;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Data Migration</h2>
      
      <button
        onClick={startMigration}
        disabled={isLoading || status.isRunning}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {isLoading ? 'Starting...' : 'Start Migration'}
      </button>

      {status.error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {status.error}
        </div>
      )}

      {status.isRunning && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${status.progress}%` }}
            ></div>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Progress: {status.progress}%
          </p>
        </div>
      )}

      {status.logs.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Migration Logs:</h3>
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