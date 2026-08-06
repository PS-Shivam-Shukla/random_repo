import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

export const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-indigo-900/50 text-indigo-300 border border-indigo-700/50',
        secondary: 'bg-slate-800 text-slate-300 border border-slate-700',
        success: 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/50',
        warning: 'bg-amber-950/60 text-amber-300 border border-amber-800/50',
        destructive: 'bg-rose-950/60 text-rose-300 border border-rose-800/50',
        outline: 'border border-slate-700 text-slate-300 bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

export const Badge: React.FC<BadgeProps> = ({ className, variant, ...props }) => {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
};
