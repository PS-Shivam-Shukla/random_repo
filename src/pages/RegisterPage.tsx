import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, User, Sparkles } from 'lucide-react';
import { Button } from '../components/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/Card';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../hooks/useNotification';
import { RegisterFormData, registerSchema } from '../utils/validationHelpers';

export const RegisterPage: React.FC = () => {
  const { register: registerAccount, isLoading, error } = useAuth();
  const notify = useNotification();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: 'CANDIDATE' },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerAccount(data);
      notify.success('Account Created!', 'Welcome to InterviewSage AI.');
      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      notify.error('Registration Failed', err.message || 'Error creating account.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 text-slate-100">
      <Card className="w-full max-w-md border-slate-800 bg-slate-900 shadow-2xl">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white font-bold shadow-lg mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>Join InterviewSage AI Enterprise Platform</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          {error && (
            <div className="mb-4 rounded-lg bg-rose-950/50 p-3 text-xs font-medium text-rose-300 border border-rose-800/50">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Shivam Shukla"
              leftIcon={<User className="w-4 h-4 text-slate-400" />}
              error={errors.full_name?.message}
              {...register('full_name')}
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="candidate@interviewsage.ai"
              leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
              error={errors.email?.message}
              {...register('email')}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
              error={errors.password?.message}
              {...register('password')}
            />
            <Select
              label="Account Role"
              options={[
                { value: 'CANDIDATE', label: 'Candidate (Interviewee)' },
                { value: 'RECRUITER', label: 'Recruiter (Interviewer / HR)' },
                { value: 'ADMIN', label: 'Administrator' },
              ]}
              {...register('role')}
            />
            <Button type="submit" className="w-full" isLoading={isLoading}>
              Register Account
            </Button>
          </form>
          <div className="mt-6 text-center text-xs text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-indigo-400 hover:text-indigo-300">
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
