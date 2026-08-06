import { useState } from 'react';
import { Bell, CheckCircle2, Save } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { useNotificationSettings, useUpdateNotifications } from '../../../hooks/useSettingsData';
import { SkeletonBlock } from '../../../components/shared/SkeletonBlock';
import { cn } from '../../../lib/utils';

export function NotificationsTab() {
  const { data: notifs, isLoading } = useNotificationSettings();
  const updateNotifs = useUpdateNotifications();

  const [emailNotifs, setEmailNotifs] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(true);
  const [productUpdates, setProductUpdates] = useState(false);
  const [showToast, setShowToast] = useState(false);

  if (isLoading || !notifs) {
    return <SkeletonBlock count={2} className="h-44 rounded-2xl" />;
  }

  const handleSave = () => {
    updateNotifs.mutate(
      {
        emailNotifications: emailNotifs,
        interviewReminders: reminders,
        weeklySummary,
        productUpdates,
      },
      {
        onSuccess: () => {
          setShowToast(true);
          setTimeout(() => setShowToast(false), 2500);
        },
      },
    );
  };

  const toggleItems = [
    {
      id: 'emailNotifs',
      title: 'Email Notifications & Scorecards',
      description: 'Receive instant email diagnostic reports after completing an interview simulation.',
      value: emailNotifs,
      setValue: setEmailNotifs,
    },
    {
      id: 'reminders',
      title: 'Scheduled Interview Reminders',
      description: 'Get calendar reminders 15 minutes before scheduled AI interview sessions.',
      value: reminders,
      setValue: setReminders,
    },
    {
      id: 'weeklySummary',
      title: 'Weekly Learning & Growth Digest',
      description: 'Receive weekly progress digests summarizing weak-topic progress and study streak.',
      value: weeklySummary,
      setValue: setWeeklySummary,
    },
    {
      id: 'productUpdates',
      title: 'Product Feature Announcements',
      description: 'Stay informed about new AI prompt version releases and agent features.',
      value: productUpdates,
      setValue: setProductUpdates,
    },
  ];

  return (
    <Card className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 space-y-6">
      {/* Toast Feedback */}
      {showToast && (
        <div className="fixed top-16 right-6 z-50 flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xl animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="h-4 w-4" />
          <span>Notification settings updated!</span>
        </div>
      )}

      <CardHeader className="p-0 pb-2">
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-blue-600/10 p-2 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
            <Bell className="h-4 w-4" />
          </div>
          <CardTitle className="text-base font-bold text-neutral-900 dark:text-white font-display">
            Notification Preferences
          </CardTitle>
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Manage how and when InterviewSage AI sends you alerts and reports.
        </p>
      </CardHeader>

      <CardContent className="p-0 space-y-4">
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {toggleItems.map((item) => (
            <div key={item.id} className="py-4 flex items-center justify-between gap-4">
              <div className="space-y-0.5 max-w-lg">
                <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
                  {item.title}
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {item.description}
                </p>
              </div>

              {/* Switch Toggle */}
              <button
                type="button"
                onClick={() => item.setValue(!item.value)}
                className={cn(
                  'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
                  item.value ? 'bg-blue-600' : 'bg-neutral-200 dark:bg-neutral-800',
                )}
              >
                <span
                  className={cn(
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out',
                    item.value ? 'translate-x-5' : 'translate-x-0',
                  )}
                />
              </button>
            </div>
          ))}
        </div>

        <div className="pt-2 flex justify-end">
          <Button
            type="button"
            onClick={handleSave}
            disabled={updateNotifs.isPending}
            className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm shadow-blue-600/25 px-5 h-10"
          >
            <Save className="mr-1.5 h-3.5 w-3.5" />
            Save Notifications
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
