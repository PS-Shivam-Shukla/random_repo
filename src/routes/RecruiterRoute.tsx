import React from 'react';
import { RoleRoute } from './RoleRoute';

export const RecruiterRoute: React.FC = () => {
  return <RoleRoute allowedRoles={['RECRUITER', 'ADMIN']} />;
};
