import React, { useState } from 'react';
import { cn } from '../lib/utils';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  content: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultTabId?: string;
  onChange?: (tabId: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ items, defaultTabId, onChange, className }) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTabId || items[0]?.id || '');

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    if (onChange) onChange(id);
  };

  const activeContent = items.find((item) => item.id === activeTab)?.content;

  return (
    <div className={cn('w-full flex flex-col', className)}>
      <div className="flex border-b border-slate-800 space-x-1">
        {items.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                'flex items-center space-x-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px',
                isActive
                  ? 'border-indigo-500 text-indigo-400 bg-slate-800/40 rounded-t-lg'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
              )}
            >
              {tab.icon && <span>{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className="ml-1.5 rounded-full bg-indigo-950 px-2 py-0.5 text-xs text-indigo-300 border border-indigo-800/50">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="py-4">{activeContent}</div>
    </div>
  );
};
