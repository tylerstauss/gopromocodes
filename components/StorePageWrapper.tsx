'use client';

import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@/components/ErrorFallback';
import { ReactNode } from 'react';

interface StorePageWrapperProps {
  children: ReactNode;
}

export default function StorePageWrapper({ children }: StorePageWrapperProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ErrorBoundary>
  );
} 