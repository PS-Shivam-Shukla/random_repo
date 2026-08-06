import React from 'react';
import { cn } from '../lib/utils';

export interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children, className }) => {
  return <div className={cn('w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1', className)}>{children}</div>;
};
