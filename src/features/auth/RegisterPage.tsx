import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Sparkles, Mail, ArrowLeft, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { AuthLayoutShell } from './AuthLayoutShell';
import { useRegister, type RegisterErrorResponse } from '../../hooks/useRegister';

const registerSchema = z
  .object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain at least 1 uppercase letter')
      .regex(/[0-9]/, 'Must contain at least 1 number'),
    confirmPassword: z.string().min(8, 'Please confirm your password'),
    role: z.string().optional(),
    terms: z.boolean().refine((val) => val === true, {
      message: 'You must agree to the Terms of Service and Privacy Policy',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const registerMutation = useRegister();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'Software Engineer',
      terms: false,
    },
  });

  const passwordValue = watch('password', '');

  // Calculate live password strength
  const hasMinLen = passwordValue.length >= 8;
  const hasUpper = /[A-Z]/.test(passwordValue);
  const hasNum = /[0-9]/.test(passwordValue);
  const strengthScore = (hasMinLen ? 1 : 0) + (hasUpper ? 1 : 0) + (hasNum ? 1 : 0);

  const strengthLabel =
    strengthScore === 3 ? 'Strong' : strengthScore === 2 ? 'Medium' : 'Weak';
  const strengthColor =
    strengthScore === 3
      ? 'bg-emerald-500 text-emerald-600'
      : strengthScore === 2
        ? 'bg-amber-500 text-amber-600'
        : 'bg-rose-500 text-rose-600';

  const onSubmit = handleSubmit((values) => {
    setServerError(null);

    registerMutation.mutate(
      {
        fullName: values.fullName,
        email: values.email,
        password: values.password,
        role: values.role,
      },
      {
        onSuccess: () => {
          setRegisteredEmail(values.email);
          setIsSuccess(true);
        },
        onError: (err: any) => {
          const registerErr = err as RegisterErrorResponse;

          if (registerErr.type === 'email_exists') {
            setError('email', {
              type: 'manual',
              message: registerErr.message,
            });
          } else if (registerErr.type === 'validation_error' && registerErr.fieldErrors) {
            Object.entries(registerErr.fieldErrors).forEach(([field, msg]) => {
              setError(field as any, { type: 'manual', message: msg });
            });
          } else {
            setServerError(registerErr.message || 'Registration failed. Please try again.');
          }
        },
      },
    );
  });

  return (
    <AuthLayoutShell>
      {isSuccess ? (
        /* Email Verification Confirmation Screen */
        <Card className="border-0 bg-transparent shadow-none space-y-6 animate-in fade-in">
          <CardHeader className="px-0 pb-2">
            <div className="rounded-2xl bg-blue-50 dark:bg-blue-950/40 p-3.5 text-blue-600 dark:text-blue-400 w-fit">
              <Mail className="h-8 w-8" />
            </div>
            <CardTitle className="text-2xl font-bold text-neutral-900 dark:text-white font-display mt-2">
              Check your email to verify your account
            </CardTitle>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              We sent a verification link to <strong className="text-neutral-900 dark:text-white">{registeredEmail}</strong>.
              Click the link inside to activate your InterviewSage account and start your practice.
            </p>
          </CardHeader>

          <CardContent className="px-0 space-y-4">
            <div className="rounded-xl border border-neutral-200/80 bg-neutral-50/50 p-4 dark:border-neutral-800 dark:bg-neutral-950/50 text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
              <p className="font-semibold text-neutral-900 dark:text-white">Didn't receive the email?</p>
              <p>Check your spam folder or click below to resend the verification message.</p>
            </div>

            <div className="flex flex-col gap-2">
              <Button
                type="button"
                variant="outline"
                className="w-full rounded-xl text-xs font-semibold"
                onClick={() => alert('Verification email resent successfully!')}
              >
                Resend Verification Email
              </Button>

              <Link to="/sign-in" className="w-full">
                <Button type="button" variant="ghost" className="w-full rounded-xl text-xs font-semibold">
                  <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Back to Sign In
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Registration Form */
        <Card className="border-0 bg-transparent shadow-none">
          <CardHeader className="px-0 pb-4">
            <CardTitle className="text-2xl font-bold text-neutral-900 dark:text-white font-display">
              Create Your Account
            </CardTitle>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Start practicing AI mock interviews, resume parsing, and diagnostic reports today.
            </p>
          </CardHeader>

          <CardContent className="px-0 space-y-4">
            {serverError && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-700 dark:border-rose-950 dark:bg-rose-950/40 dark:text-rose-300 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{serverError}</span>
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-3.5">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                  Full Name
                </label>
                <input
                  type="text"
                  {...register('fullName')}
                  placeholder="Alex Morgan"
                  className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 shadow-2xs focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white transition-all"
                />
                {errors.fullName && (
                  <p className="text-[11px] text-rose-600 dark:text-rose-400">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                  Work or Personal Email
                </label>
                <input
                  type="email"
                  {...register('email')}
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 shadow-2xs focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white transition-all"
                />
                {errors.email && (
                  <div className="flex items-center gap-1.5 pt-0.5">
                    <p className="text-[11px] text-rose-600 dark:text-rose-400">
                      {errors.email.message}
                    </p>
                    {errors.email.message?.includes('already exists') && (
                      <Link
                        to="/sign-in"
                        className="text-[11px] font-bold text-blue-600 hover:underline dark:text-blue-400"
                      >
                        Sign in instead →
                      </Link>
                    )}
                  </div>
                )}
              </div>

              {/* Target Role Select */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                  Current / Target Role
                </label>
                <select
                  {...register('role')}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 shadow-2xs focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white transition-all"
                >
                  <option value="Software Engineer">Software Engineer / Developer</option>
                  <option value="Staff Frontend Architect">Staff Frontend Architect</option>
                  <option value="AI / ML Engineer">AI / ML Specialist</option>
                  <option value="Engineering Manager">Engineering Manager</option>
                  <option value="Student">Student / Recent Graduate</option>
                  <option value="Career Switcher">Career Switcher</option>
                </select>
              </div>

              {/* Password with Live Strength Meter */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    placeholder="Create a strong password"
                    className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 pr-10 text-xs text-neutral-900 shadow-2xs focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {/* Password Strength Progress Bar & Checklist */}
                {passwordValue && (
                  <div className="space-y-1 pt-1">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-neutral-400">Strength</span>
                      <span className={`font-bold ${strengthColor.split(' ')[1]}`}>
                        {strengthLabel}
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${strengthColor.split(' ')[0]}`}
                        style={{ width: `${(strengthScore / 3) * 100}%` }}
                      />
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-neutral-400 pt-0.5">
                      <span className={hasMinLen ? 'text-emerald-600 font-semibold' : ''}>
                        ✓ 8+ chars
                      </span>
                      <span className={hasUpper ? 'text-emerald-600 font-semibold' : ''}>
                        ✓ 1 Uppercase
                      </span>
                      <span className={hasNum ? 'text-emerald-600 font-semibold' : ''}>
                        ✓ 1 Number
                      </span>
                    </div>
                  </div>
                )}
                {errors.password && (
                  <p className="text-[11px] text-rose-600 dark:text-rose-400">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    {...register('confirmPassword')}
                    placeholder="Re-enter your password"
                    className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 pr-10 text-xs text-neutral-900 shadow-2xs focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-700 dark:bg-neutral-950 dark:text-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-[11px] text-rose-600 dark:text-rose-400">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="space-y-1 pt-1">
                <label className="flex items-start gap-2 cursor-pointer text-xs text-neutral-600 dark:text-neutral-400">
                  <input
                    type="checkbox"
                    {...register('terms')}
                    className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span>
                    I agree to the{' '}
                    <a href="#terms" className="font-semibold text-blue-600 underline dark:text-blue-400">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#privacy" className="font-semibold text-blue-600 underline dark:text-blue-400">
                      Privacy Policy
                    </a>
                  </span>
                </label>
                {errors.terms && (
                  <p className="text-[11px] text-rose-600 dark:text-rose-400">
                    {errors.terms.message}
                  </p>
                )}
              </div>

              {/* Submit CTA Button */}
              <Button
                type="submit"
                disabled={registerMutation.isPending}
                className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-3 shadow-md shadow-blue-600/25 mt-2"
              >
                {registerMutation.isPending ? (
                  <>
                    <Sparkles className="mr-1.5 h-4 w-4 animate-spin" /> Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200 dark:border-neutral-800" />
              </div>
              <span className="relative bg-white dark:bg-neutral-900 px-3 text-[11px] text-neutral-400 uppercase font-mono">
                or sign up with
              </span>
            </div>

            {/* OAuth Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => alert('Google OAuth Sign Up triggered')}
                className="rounded-xl border-neutral-200 text-xs font-semibold dark:border-neutral-700"
              >
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => alert('GitHub OAuth Sign Up triggered')}
                className="rounded-xl border-neutral-200 text-xs font-semibold dark:border-neutral-700"
              >
                GitHub
              </Button>
            </div>

            {/* Footer Sign In Link */}
            <div className="pt-2 text-center text-xs text-neutral-600 dark:text-neutral-400">
              Already have an account?{' '}
              <Link to="/sign-in" className="font-bold text-blue-600 hover:underline dark:text-blue-400">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </AuthLayoutShell>
  );
}
