"use client";

import { useState, useEffect } from 'react';

type MigrationStatus = {
  inProgress: boolean;
  lastRun: string | null;
  logs: string[];
  error: string | null;
  success: boolean;
}

const DataMigration = () => {
  const [status, setStatus] = useState<MigrationStatus>({
    inProgress: false,
    lastRun: null,
    logs: [],
    error: null,
    success: false
  });
  const [loading, setLoading] = useState(false);
  const [resetDb, setResetDb] = useState(false);
  const [selectedTables, setSelectedTables] = useState<string[]>(['all']);
  const [showLogs, setShowLogs] = useState(false);
  
  const tables = [
    { id: 'all', label: 'All Tables' },
    { id: 'categories', label: 'Categories' },
    { id: 'stores', label: 'Stores' },
    { id: 'promo_codes', label: 'Promo Codes' },
    { id: 'users', label: 'Users' },
    { id: 'store_blogs', label: 'Store Blogs' },
    { id: 'category_promo_codes', label: 'Category-Promo Relationships' },
    { id: 'subscribers', label: 'Subscribers' }
  ];
  
  // Fetch current migration status
  const fetchStatus = async () => {
    try {
      const response = await fetch('/api/admin/migration-status');
      
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched migration status:', data); // Debug log
        setStatus(data);
      } else {
        console.error('Failed to fetch migration status:', await response.text());
      }
    } catch (error) {
      console.error('Error fetching migration status:', error);
    }
  };
  
  // Start migration
  const startMigration = async () => {
    setLoading(true);
    setShowLogs(true); // Always show logs when starting migration
    
    try {
      const tables = selectedTables.includes('all') ? ['all'] : selectedTables;
      
      const response = await fetch('/api/admin/migrate-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tables,
          resetDatabase: resetDb
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Migration started:', data);
        // Fetch status immediately after starting migration
        await fetchStatus();
      } else {
        const error = await response.json();
        console.error('Failed to start migration:', error);
        alert(`Error: ${error.error || 'Failed to start migration'}`);
      }
    } catch (error) {
      console.error('Error starting migration:', error);
      alert('An error occurred while starting the migration process');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle table selection
  const handleTableSelect = (tableId: string) => {
    if (tableId === 'all') {
      // If 'all' is selected, only include 'all'
      setSelectedTables(['all']);
      return;
    }
    
    // Create a new selection array without 'all'
    let newSelection = selectedTables.filter(id => id !== 'all');
    
    // Toggle the selected table
    if (newSelection.includes(tableId)) {
      newSelection = newSelection.filter(id => id !== tableId);
    } else {
      newSelection = [...newSelection, tableId];
    }
    
    // If no specific tables are selected, default to 'all'
    if (newSelection.length === 0) {
      setSelectedTables(['all']);
    } else {
      setSelectedTables(newSelection);
    }
  };
  
  // Poll for status updates when migration is in progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    const pollStatus = async () => {
      if (showLogs && status.inProgress) {
        await fetchStatus();
        interval = setInterval(pollStatus, 2000);
      }
    };
    
    pollStatus();
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [status.inProgress, showLogs]);
  
  return (
    <div className="bg-white shadow-md rounded p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4">Data Migration</h2>
      
      <div className="mb-4">
        <p className="text-gray-700 mb-2">
          Migrate data from the Heroku PostgreSQL database to your local database.
        </p>
        
        {status.lastRun && (
          <p className="text-sm text-gray-600 mb-2">
            Last run: {new Date(status.lastRun).toLocaleString()}
          </p>
        )}
        
        {status.inProgress && (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
            <p className="font-bold">Migration in progress...</p>
            <p>Please wait for the process to complete.</p>
          </div>
        )}
        
        {status.error && !status.inProgress && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-bold">Error</p>
            <p>{status.error}</p>
          </div>
        )}
        
        {status.success && !status.inProgress && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            <p className="font-bold">Success</p>
            <p>Migration completed successfully.</p>
          </div>
        )}
      </div>
      
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Options</h3>
        
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="resetDb"
            checked={resetDb}
            onChange={() => setResetDb(!resetDb)}
            className="mr-2"
            disabled={status.inProgress}
          />
          <label htmlFor="resetDb" className="text-gray-700">
            Reset database before migration (will delete all existing data)
          </label>
        </div>
        
        <div className="mb-4">
          <h4 className="text-md font-medium mb-2">Tables to migrate:</h4>
          <div className="grid grid-cols-2 gap-2">
            {tables.map(table => (
              <div key={table.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`table-${table.id}`}
                  checked={selectedTables.includes(table.id)}
                  onChange={() => handleTableSelect(table.id)}
                  className="mr-2"
                  disabled={status.inProgress}
                />
                <label htmlFor={`table-${table.id}`} className="text-gray-700">
                  {table.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex space-x-4 mb-4">
        <button
          onClick={startMigration}
          disabled={status.inProgress || loading}
          className={`px-4 py-2 rounded ${
            status.inProgress || loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {loading ? 'Starting...' : status.inProgress ? 'Migration In Progress' : 'Start Migration'}
        </button>
        
        <button
          onClick={fetchStatus}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
          Refresh Status
        </button>
        
        <button
          onClick={() => setShowLogs(!showLogs)}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
          {showLogs ? 'Hide Logs' : 'Show Logs'}
        </button>
      </div>
      
      {showLogs && (
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">Migration Logs</h3>
          <div className="bg-gray-800 text-gray-100 p-4 rounded h-80 overflow-y-auto font-mono text-sm">
            {status.logs.length === 0 ? (
              <p className="text-gray-400">No logs available</p>
            ) : (
              status.logs.map((log, index) => (
                <div key={index} className="mb-1">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DataMigration; 