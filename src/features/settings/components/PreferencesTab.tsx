import { useState } from 'react';
import { Sun, Moon, Laptop, CheckCircle2, Save, Sliders } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { usePreferences, useUpdatePreferences } from '../../../hooks/useSettingsData';
import { SkeletonBlock } from '../../../components/shared/SkeletonBlock';
import { cn } from '../../../lib/utils';
import { useTheme } from '../../../app/ThemeProvider';

export function PreferencesTab() {
  const { data: prefs, isLoading } = usePreferences();
  const updatePrefs = useUpdatePreferences();
  const { setTheme } = useTheme();

  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>('system');
  const [language, setLanguage] = useState('English (US)');
  const [duration, setDuration] = useState('45');
  const [difficulty, setDifficulty] = useState('Hard');
  const [showToast, setShowToast] = useState(false);

  if (isLoading || !prefs) {
    return <SkeletonBlock count={2} className="h-44 rounded-2xl" />;
  }

  const handleSave = () => {
    updatePrefs.mutate(
      { theme: themeMode, language, defaultDuration: duration, defaultDifficulty: difficulty },
      {
        onSuccess: () => {
          if (themeMode !== 'system') {
            setTheme(themeMode);
          }
          setShowToast(true);
          setTimeout(() => setShowToast(false), 2500);
        },
      },
    );
  };

  return (
    <Card className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 space-y-6">
      {/* Toast Feedback */}
      {showToast && (
        <div className="fixed top-16 right-6 z-50 flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xl animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="h-4 w-4" />
          <span>Application preferences updated!</span>
        </div>
      )}

      <CardHeader className="p-0 pb-2">
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-blue-600/10 p-2 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
            <Sliders className="h-4 w-4" />
          </div>
          <CardTitle className="text-base font-bold text-neutral-900 dark:text-white font-display">
            Application & Theme Preferences
          </CardTitle>
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Customize interface appearance mode, language, and default interview simulation defaults.
        </p>
      </CardHeader>

      <CardContent className="p-0 space-y-6">
        {/* Segmented Theme Switcher */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
            Interface Theme Mode
          </label>
          <div className="inline-flex rounded-xl border border-neutral-200 bg-neutral-100 p-1 dark:border-neutral-800 dark:bg-neutral-800/80 max-w-sm w-full">
            <button
              type="button"
              onClick={() => setThemeMode('light')}
              className={cn(
                'flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold transition-all',
                themeMode === 'light'
                  ? 'bg-white text-blue-600 shadow-xs dark:bg-neutral-900 dark:text-blue-400'
                  : 'text-neutral-600 dark:text-neutral-400',
              )}
            >
              <Sun className="h-3.5 w-3.5" /> Light
            </button>

            <button
              type="button"
              onClick={() => setThemeMode('dark')}
              className={cn(
                'flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold transition-all',
                themeMode === 'dark'
                  ? 'bg-white text-blue-600 shadow-xs dark:bg-neutral-900 dark:text-blue-400'
                  : 'text-neutral-600 dark:text-neutral-400',
              )}
            >
              <Moon className="h-3.5 w-3.5" /> Dark
            </button>

            <button
              type="button"
              onClick={() => setThemeMode('system')}
              className={cn(
                'flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold transition-all',
                themeMode === 'system'
                  ? 'bg-white text-blue-600 shadow-xs dark:bg-neutral-900 dark:text-blue-400'
                  : 'text-neutral-600 dark:text-neutral-400',
              )}
            >
              <Laptop className="h-3.5 w-3.5" /> System
            </button>
          </div>
        </div>

        {/* Language & Defaults Form Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full rounded-xl border border-neutral-200/90 bg-neutral-50/50 px-3.5 py-2 text-xs text-neutral-900 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-800 dark:bg-neutral-950/50 dark:text-white transition-all"
            >
              <option value="English (US)">English (US)</option>
              <option value="English (UK)">English (UK)</option>
              <option value="Spanish">Spanish (Español)</option>
              <option value="German">German (Deutsch)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
              Default Session Duration
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full rounded-xl border border-neutral-200/90 bg-neutral-50/50 px-3.5 py-2 text-xs text-neutral-900 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-800 dark:bg-neutral-950/50 dark:text-white transition-all"
            >
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">60 minutes</option>
              <option value="90">90 minutes</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
              Default Interview Difficulty
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full rounded-xl border border-neutral-200/90 bg-neutral-50/50 px-3.5 py-2 text-xs text-neutral-900 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-800 dark:bg-neutral-950/50 dark:text-white transition-all"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
              <option value="Advanced">Advanced / Staff</option>
            </select>
          </div>
        </div>

        {/* Save CTA */}
        <div className="pt-2 flex justify-end">
          <Button
            type="button"
            onClick={handleSave}
            disabled={updatePrefs.isPending}
            className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm shadow-blue-600/25 px-5 h-10"
          >
            <Save className="mr-1.5 h-3.5 w-3.5" />
            Save Preferences
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
