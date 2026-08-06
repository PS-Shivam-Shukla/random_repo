import React from 'react';
import { Breadcrumb } from './Breadcrumb';

export interface TopbarProps {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
}

export const Topbar: React.FC<TopbarProps> = ({ title, description, actions }) => {
  return (
    <div className="flex flex-col space-y-2 pb-4 mb-6 border-b border-slate-800/80">
      <Breadcrumb />
      {(title || actions) && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            {title && <h1 className="text-xl font-bold text-slate-100 tracking-tight">{title}</h1>}
            {description && <p className="text-xs text-slate-400 mt-1">{description}</p>}
          </div>
          {actions && <div className="flex items-center space-x-3">{actions}</div>}
        </div>
      )}
    </div>
  );
};
