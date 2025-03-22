'use client';

import React from 'react';
import Sidebar from './Sidebar';

interface PageLayoutProps {
  children: React.ReactNode;
  popularStores?: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  popularCategories?: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  showSidebar?: boolean;
}

const PageLayout = ({
  children,
  popularStores = [],
  popularCategories = [],
  showSidebar = true
}: PageLayoutProps) => {
  if (!showSidebar) {
    return <>{children}</>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
      <div className="md:col-span-8">
        {children}
      </div>
      <div className="md:col-span-4">
        <Sidebar
          popularStores={popularStores}
          popularCategories={popularCategories}
        />
      </div>
    </div>
  );
};

export default PageLayout; 