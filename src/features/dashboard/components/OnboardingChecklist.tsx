import { CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const steps = [
  { label: 'Create your first interview run', href: '/dashboard/new-interview' },
  { label: 'Review your latest feedback', href: '/dashboard/reports' },
  { label: 'Explore the analytics view', href: '/dashboard/analytics' },
];

export function OnboardingChecklist() {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden border-blue-200/70 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:border-blue-900/40 dark:from-blue-950/30 dark:via-neutral-900 dark:to-indigo-950/30">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-blue-600/10 p-2 text-blue-600 dark:text-blue-400">
            <Sparkles className="h-4 w-4" />
          </div>
          <CardTitle className="text-lg">Your next best step</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          A calm, guided flow helps you move from preparation to momentum without friction.
        </p>
        <div className="space-y-3">
          {steps.map((step) => (
            <button
              key={step.label}
              onClick={() => navigate(step.href)}
              className="flex w-full items-center justify-between rounded-2xl border border-white/70 bg-white/80 px-3 py-3 text-left text-sm shadow-sm transition hover:-translate-y-0.5 hover:bg-white dark:border-neutral-800 dark:bg-neutral-900/70 dark:hover:bg-neutral-900"
            >
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                {step.label}
              </span>
              <ArrowRight className="h-4 w-4 text-neutral-400" />
            </button>
          ))}
        </div>
        <Button onClick={() => navigate('/dashboard/new-interview')} className="w-full">
          Launch your first interview
        </Button>
      </CardContent>
    </Card>
  );
}
