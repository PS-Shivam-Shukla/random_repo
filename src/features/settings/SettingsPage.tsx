import { useSearchParams } from 'react-router-dom';
import { PageHeader } from '../../components/shared/PageHeader';

import { ProfileTab } from './components/ProfileTab';
import { PreferencesTab } from './components/PreferencesTab';
import { NotificationsTab } from './components/NotificationsTab';
import { ModelsTab } from './components/ModelsTab';
import { SecurityTab } from './components/SecurityTab';
import { ApiKeysTab } from './components/ApiKeysTab';

import { User, Sliders, Bell, Cpu, ShieldCheck, Key } from 'lucide-react';
import { cn } from '../../lib/utils';

const SETTINGS_TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'preferences', label: 'Preferences', icon: Sliders },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'models', label: 'Models & Prompts', icon: Cpu },
  { id: 'security', label: 'Security & 2FA', icon: ShieldCheck },
  { id: 'apikeys', label: 'API Keys', icon: Key },
];

export function SettingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'profile';

  const handleTabChange = (tabId: string) => {
    setSearchParams({ tab: tabId });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <PageHeader
        title="Settings & Preferences"
        description="Manage candidate profile, AI evaluator strictness, notification channels, security policies, and API keys."
      />

      {/* Main Settings Layout (Sidebar Nav + Active Tab Panel) */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Left Sidebar Tab Navigation */}
        <nav className="w-full md:w-64 shrink-0 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 p-2 shadow-xs space-y-1 overflow-x-auto flex md:flex-col flex-row">
          {SETTINGS_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={cn(
                  'flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all w-full text-left shrink-0',
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white',
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Active Tab Content */}
        <div className="flex-1 w-full space-y-6">
          {activeTab === 'profile' && <ProfileTab />}
          {activeTab === 'preferences' && <PreferencesTab />}
          {activeTab === 'notifications' && <NotificationsTab />}
          {activeTab === 'models' && <ModelsTab />}
          {activeTab === 'security' && <SecurityTab />}
          {activeTab === 'apikeys' && <ApiKeysTab />}
        </div>
      </div>
    </div>
  );
}
