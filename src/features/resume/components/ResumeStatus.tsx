import React from 'react';
import { Badge } from '../../../components/Badge';
import { getSeniorityBadgeVariant } from '../utils/resumeHelpers';

export interface ResumeStatusProps {
  senioritySignal?: string;
  skillCount?: number;
}

export const ResumeStatus: React.FC<ResumeStatusProps> = ({ senioritySignal = 'MID', skillCount = 0 }) => {
  const variant = getSeniorityBadgeVariant(senioritySignal);

  return (
    <div className="flex items-center space-x-2">
      <Badge variant={variant}>{senioritySignal}</Badge>
      <Badge variant="outline">{skillCount} Skills Parsed</Badge>
    </div>
  );
};
