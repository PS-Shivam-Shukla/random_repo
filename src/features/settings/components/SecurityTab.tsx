import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ShieldCheck, CheckCircle2, Lock, Smartphone, Laptop, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import {
  useSecuritySettings,
  useChangePassword,
  useRevokeSession,
} from '../../../hooks/useSettingsData';
import { SkeletonBlock } from '../../../components/shared/SkeletonBlock';
import { cn } from '../../../lib/utils';

const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, 'Current password is required'),
    newPassword: z.string().min(8, 'New password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Confirm password is required'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'New passwords do not match',
    path: ['confirmPassword'],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

export function SecurityTab() {
  const { data: security, isLoading } = useSecuritySettings();
  const changePassword = useChangePassword();
  const revokeSession = useRevokeSession();

  const [is2fa, setIs2fa] = useState(true);
  const [showToast, setShowToast] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  if (isLoading || !security) {
    return <SkeletonBlock count={3} className="h-44 rounded-2xl" />;
  }

  const onChangePasswordSubmit = handleSubmit(() => {
    changePassword.mutate(undefined, {
      onSuccess: () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
        reset();
      },
    });
  });

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      {showToast && (
        <div className="fixed top-16 right-6 z-50 flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xl animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="h-4 w-4" />
          <span>Password changed successfully!</span>
        </div>
      )}

      {/* 2FA Card */}
      <Card className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-600/10 p-2 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
              <Smartphone className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                Two-Factor Authentication (2FA)
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Add an extra layer of security using Google Authenticator or WebAuthn.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIs2fa(!is2fa)}
            className={cn(
              'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
              is2fa ? 'bg-emerald-600' : 'bg-neutral-200 dark:bg-neutral-800',
            )}
          >
            <span
              className={cn(
                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out',
                is2fa ? 'translate-x-5' : 'translate-x-0',
              )}
            />
          </button>
        </div>
      </Card>

      {/* Change Password Card */}
      <Card className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 space-y-6">
        <CardHeader className="p-0 pb-2">
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-blue-600/10 p-2 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
              <Lock className="h-4 w-4" />
            </div>
            <CardTitle className="text-base font-bold text-neutral-900 dark:text-white font-display">
              Change Account Password
            </CardTitle>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Ensure your account is using a strong, unique password.
          </p>
        </CardHeader>

        <CardContent className="p-0">
          <form onSubmit={onChangePasswordSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                  Current Password
                </label>
                <input
                  type="password"
                  {...register('currentPassword')}
                  className="w-full rounded-xl border border-neutral-200/90 bg-neutral-50/50 px-3.5 py-2 text-xs text-neutral-900 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-800 dark:bg-neutral-950/50 dark:text-white transition-all"
                />
                {errors.currentPassword && (
                  <p className="text-[11px] text-rose-600 dark:text-rose-400">
                    {errors.currentPassword.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                  New Password
                </label>
                <input
                  type="password"
                  {...register('newPassword')}
                  className="w-full rounded-xl border border-neutral-200/90 bg-neutral-50/50 px-3.5 py-2 text-xs text-neutral-900 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-800 dark:bg-neutral-950/50 dark:text-white transition-all"
                />
                {errors.newPassword && (
                  <p className="text-[11px] text-rose-600 dark:text-rose-400">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  {...register('confirmPassword')}
                  className="w-full rounded-xl border border-neutral-200/90 bg-neutral-50/50 px-3.5 py-2 text-xs text-neutral-900 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-800 dark:bg-neutral-950/50 dark:text-white transition-all"
                />
                {errors.confirmPassword && (
                  <p className="text-[11px] text-rose-600 dark:text-rose-400">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                type="submit"
                disabled={changePassword.isPending}
                className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm shadow-blue-600/25 px-5 h-10"
              >
                Update Password
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Active Sessions Card */}
      <Card className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 space-y-4">
        <CardHeader className="p-0 pb-2">
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-blue-600/10 p-2 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <CardTitle className="text-base font-bold text-neutral-900 dark:text-white font-display">
              Active Login Sessions
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {security.sessions.map((sess) => (
              <div key={sess.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Laptop className="h-5 w-5 text-neutral-400" />
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
                      {sess.device} {sess.current && '(This Device)'}
                    </h4>
                    <p className="text-[11px] text-neutral-500">{sess.location} • {sess.lastActive}</p>
                  </div>
                </div>

                {!sess.current && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => revokeSession.mutate(sess.id)}
                    className="h-8 rounded-xl text-xs text-rose-600 border-neutral-200 dark:border-neutral-700"
                  >
                    <Trash2 className="mr-1 h-3.5 w-3.5" /> Revoke
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
