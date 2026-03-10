'use client';

import React from 'react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 text-center">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Something went wrong</h2>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-brand-red text-white rounded hover:bg-brand-red-dark"
      >
        Try again
      </button>
    </div>
  );
};

export default ErrorFallback; 