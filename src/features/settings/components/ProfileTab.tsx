import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Camera, CheckCircle2, Save, Sparkles, UserCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { useProfile, useUpdateProfile } from '../../../hooks/useSettingsData';
import { SkeletonBlock } from '../../../components/shared/SkeletonBlock';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  role: z.string().min(2, 'Role title is required'),
  company: z.string().min(2, 'Company name is required'),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function ProfileTab() {
  const { data: profile, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();
  const [showToast, setShowToast] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: '',
      email: '',
      role: '',
      company: '',
    },
  });

  useEffect(() => {
    if (profile) {
      reset({
        fullName: profile.fullName,
        email: profile.email,
        role: profile.role,
        company: profile.company,
      });
    }
  }, [profile, reset]);

  if (isLoading || !profile) {
    return <SkeletonBlock count={3} className="h-44 rounded-2xl" />;
  }

  const onSubmit = handleSubmit((values) => {
    updateProfile.mutate(values, {
      onSuccess: () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
        reset(values);
      },
    });
  });

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      {showToast && (
        <div className="fixed top-16 right-6 z-50 flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xl animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="h-4 w-4" />
          <span>Profile changes saved successfully!</span>
        </div>
      )}

      {/* Account Status Card */}
      <Card className="rounded-2xl border border-blue-200/80 bg-blue-50/40 p-5 dark:border-blue-950/40 dark:bg-blue-950/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-600/10 p-2 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
              <UserCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                  Account Status & Plan
                </h3>
                <Badge variant="success" className="text-[10px] font-bold">
                  {profile.accountStatus} MEMBER
                </Badge>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Member since {profile.memberSince} • Enterprise Subscription
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Profile Form */}
      <Card className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 space-y-6">
        <CardHeader className="p-0 pb-2">
          <CardTitle className="text-base font-bold text-neutral-900 dark:text-white font-display">
            Personal Information
          </CardTitle>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Update your candidate profile photo, name, email address, and role details.
          </p>
        </CardHeader>

        <CardContent className="p-0 space-y-6">
          {/* Avatar Uploader with Hover Overlay */}
          <div className="flex items-center gap-4">
            <div className="group relative h-20 w-20 overflow-hidden rounded-full border-2 border-blue-600/30 bg-neutral-100 shadow-md">
              <img
                src={profile.avatarUrl}
                alt={profile.fullName}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white">
                <Camera className="h-5 w-5" />
                <span className="text-[9px] font-semibold mt-0.5">Change</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
                Profile Avatar Photo
              </h4>
              <p className="text-[11px] text-neutral-400">
                JPG, GIF or PNG. Max size of 5MB.
              </p>
            </div>
          </div>

          {/* Form Grid */}
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                  Full Name
                </label>
                <input
                  type="text"
                  {...register('fullName')}
                  className="w-full rounded-xl border border-neutral-200/90 bg-neutral-50/50 px-3.5 py-2 text-xs text-neutral-900 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-800 dark:bg-neutral-950/50 dark:text-white transition-all"
                />
                {errors.fullName && (
                  <p className="text-[11px] text-rose-600 dark:text-rose-400">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                  Email Address
                </label>
                <input
                  type="email"
                  {...register('email')}
                  className="w-full rounded-xl border border-neutral-200/90 bg-neutral-50/50 px-3.5 py-2 text-xs text-neutral-900 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-800 dark:bg-neutral-950/50 dark:text-white transition-all"
                />
                {errors.email && (
                  <p className="text-[11px] text-rose-600 dark:text-rose-400">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                  Target Role Title
                </label>
                <input
                  type="text"
                  {...register('role')}
                  className="w-full rounded-xl border border-neutral-200/90 bg-neutral-50/50 px-3.5 py-2 text-xs text-neutral-900 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-800 dark:bg-neutral-950/50 dark:text-white transition-all"
                />
                {errors.role && (
                  <p className="text-[11px] text-rose-600 dark:text-rose-400">
                    {errors.role.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                  Company / Organization
                </label>
                <input
                  type="text"
                  {...register('company')}
                  className="w-full rounded-xl border border-neutral-200/90 bg-neutral-50/50 px-3.5 py-2 text-xs text-neutral-900 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-800 dark:bg-neutral-950/50 dark:text-white transition-all"
                />
                {errors.company && (
                  <p className="text-[11px] text-rose-600 dark:text-rose-400">
                    {errors.company.message}
                  </p>
                )}
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-2 flex justify-end">
              <Button
                type="submit"
                disabled={!isDirty || updateProfile.isPending}
                className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm shadow-blue-600/25 px-5 h-10"
              >
                {updateProfile.isPending ? (
                  <>
                    <Sparkles className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save className="mr-1.5 h-3.5 w-3.5" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
