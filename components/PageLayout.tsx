'use client';

import React from 'react';
import Sidebar from './Sidebar';

interface PageLayoutProps {
  children: React.ReactNode;
  popularStores?: Array<{
    id: number;
    name: string;
    slug: string;
    clickStats?: {
      total: number;
      recent: number;
      weighted: number;
    };
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
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-8/12">
        {children}
      </div>
      <Sidebar
        popularStores={popularStores}
        popularCategories={popularCategories}
      />
    </div>
  );
};

export default PageLayout; 