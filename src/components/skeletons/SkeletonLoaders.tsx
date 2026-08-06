import React from 'react';
import { Skeleton } from '../Skeleton';
import { Card, CardContent, CardHeader } from '../Card';

export const SkeletonCard: React.FC = () => (
  <Card className="border-slate-800 bg-slate-900 shadow-xl">
    <CardHeader className="pb-2 space-y-2">
      <Skeleton className="h-4 w-1/3 rounded-lg" />
      <Skeleton className="h-3 w-2/3 rounded-lg" />
    </CardHeader>
    <CardContent className="space-y-3 pt-2">
      <Skeleton className="h-8 w-1/2 rounded-lg" />
      <Skeleton className="h-3 w-full rounded-lg" />
    </CardContent>
  </Card>
);

export const SkeletonTable: React.FC = () => (
  <div className="w-full space-y-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
    <div className="flex justify-between items-center pb-2 border-b border-slate-800">
      <Skeleton className="h-6 w-40 rounded-lg" />
      <Skeleton className="h-8 w-24 rounded-lg" />
    </div>
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center justify-between py-2 border-b border-slate-800/60">
        <Skeleton className="h-4 w-1/4 rounded" />
        <Skeleton className="h-4 w-1/5 rounded" />
        <Skeleton className="h-4 w-1/6 rounded" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    ))}
  </div>
);

export const SkeletonChart: React.FC = () => (
  <Card className="border-slate-800 bg-slate-900 shadow-xl">
    <CardHeader className="pb-2">
      <Skeleton className="h-5 w-48 rounded-lg" />
    </CardHeader>
    <CardContent className="pt-4 flex items-end justify-between h-56 space-x-3">
      {[...Array(7)].map((_, i) => (
        <Skeleton key={i} className="w-full rounded-t-lg" style={{ height: `${Math.max(20, (i + 1) * 12)}%` }} />
      ))}
    </CardContent>
  </Card>
);

export const SkeletonTranscript: React.FC = () => (
  <div className="space-y-4 p-4 bg-slate-900 rounded-2xl border border-slate-800">
    {[...Array(4)].map((_, i) => (
      <div key={i} className={`flex items-start space-x-3 ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-16 w-3/4 rounded-2xl" />
      </div>
    ))}
  </div>
);

export const SkeletonMetrics: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    {[...Array(3)].map((_, i) => (
      <Card key={i} className="border-slate-800 bg-slate-900">
        <CardContent className="p-4 space-y-2">
          <Skeleton className="h-3 w-1/2 rounded" />
          <Skeleton className="h-8 w-1/3 rounded-lg" />
        </CardContent>
      </Card>
    ))}
  </div>
);

export const SkeletonTimeline: React.FC = () => (
  <div className="space-y-6 pl-4 border-l-2 border-slate-800">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="space-y-2 relative pl-4">
        <Skeleton className="absolute -left-[21px] top-0 h-4 w-4 rounded-full" />
        <Skeleton className="h-5 w-48 rounded" />
        <Skeleton className="h-3 w-32 rounded" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
    ))}
  </div>
);

export const SkeletonProfile: React.FC = () => (
  <div className="flex items-center space-x-4 p-4 bg-slate-900 rounded-2xl border border-slate-800">
    <Skeleton className="h-16 w-16 rounded-full" />
    <div className="space-y-2 flex-1">
      <Skeleton className="h-5 w-40 rounded" />
      <Skeleton className="h-3 w-28 rounded" />
      <Skeleton className="h-3 w-3/4 rounded" />
    </div>
  </div>
);

export const SkeletonResume: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <Card className="border-slate-800 bg-slate-900 h-96 p-4">
      <Skeleton className="h-full w-full rounded-xl" />
    </Card>
    <div className="space-y-4">
      <SkeletonCard />
      <SkeletonCard />
    </div>
  </div>
);

export const SkeletonReplay: React.FC = () => (
  <div className="space-y-4">
    <SkeletonCard />
    <SkeletonCard />
  </div>
);
