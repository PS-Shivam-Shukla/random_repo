import React, { useState } from 'react';
import { User, Lock, Mic, Globe } from 'lucide-react';
import { Button } from '../components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Tabs } from '../components/Tabs';
import { Topbar } from '../layouts/Topbar';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../hooks/useNotification';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const notify = useNotification();

  const [name, setName] = useState(user?.email ? user.email.split('@')[0] : 'Alex Mercer');
  const [email, setEmail] = useState(user?.email || 'candidate@interviewsage.ai');
  const [language, setLanguage] = useState('en-US');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      notify.success('Settings Saved', 'Your application preferences have been updated successfully.');
    }, 600);
  };

  return (
    <div className="flex flex-col space-y-6 w-full max-w-4xl mx-auto">
      <Topbar
        title="Application & System Settings"
        description="Manage your profile credentials, theme preferences, voice hardware, and security controls."
      />

      <Tabs
        items={[
          {
            id: 'profile',
            label: 'Profile & Account',
            icon: <User className="w-4 h-4 text-indigo-400" />,
            content: (
              <Card className="border-slate-800 bg-slate-900 shadow-xl">
                <CardHeader className="pb-3 border-b border-slate-800">
                  <CardTitle className="text-sm font-bold text-slate-100">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <Input
                    label="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    leftIcon={<User className="w-4 h-4 text-slate-400" />}
                  />
                  <Input
                    label="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    leftIcon={<Globe className="w-4 h-4 text-slate-400" />}
                  />
                  <Button onClick={handleSave} isLoading={isSaving}>
                    Save Account Changes
                  </Button>
                </CardContent>
              </Card>
            ),
          },
          {
            id: 'voice',
            label: 'Voice Hardware Settings',
            icon: <Mic className="w-4 h-4 text-emerald-400" />,
            content: (
              <Card className="border-slate-800 bg-slate-900 shadow-xl">
                <CardHeader className="pb-3 border-b border-slate-800">
                  <CardTitle className="text-sm font-bold text-slate-100">Microphone & Speaker Diagnostics</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <Select
                    label="Microphone Device"
                    options={[
                      { value: 'default', label: 'Default System Microphone' },
                      { value: 'headset', label: 'USB Audio Headset Mic' },
                    ]}
                  />
                  <Select
                    label="Audio Output Speaker"
                    options={[
                      { value: 'default', label: 'Default Headphones / Speakers' },
                    ]}
                  />
                  <Select
                    label="Evaluation Language & Accent"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    options={[
                      { value: 'en-US', label: 'English (US Neutral)' },
                      { value: 'en-GB', label: 'English (UK Executive)' },
                      { value: 'en-IN', label: 'English (Global Tech)' },
                    ]}
                  />
                  <Button onClick={handleSave} isLoading={isSaving}>
                    Save Hardware Preferences
                  </Button>
                </CardContent>
              </Card>
            ),
          },
          {
            id: 'security',
            label: 'Security & Access',
            icon: <Lock className="w-4 h-4 text-amber-400" />,
            content: (
              <Card className="border-slate-800 bg-slate-900 shadow-xl">
                <CardHeader className="pb-3 border-b border-slate-800">
                  <CardTitle className="text-sm font-bold text-slate-100">Change Password & Security Tokens</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <Input label="Current Password" type="password" />
                  <Input label="New Password" type="password" />
                  <Button onClick={handleSave} isLoading={isSaving}>
                    Update Password
                  </Button>
                </CardContent>
              </Card>
            ),
          },
        ]}
      />
    </div>
  );
};
