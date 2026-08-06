import React from 'react';
import { RoleRoute } from './RoleRoute';

export const CandidateRoute: React.FC = () => {
  return <RoleRoute allowedRoles={['CANDIDATE', 'ADMIN']} />;
};
