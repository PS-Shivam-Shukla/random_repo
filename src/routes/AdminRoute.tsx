import React from 'react';
import { RoleRoute } from './RoleRoute';

export const AdminRoute: React.FC = () => {
  return <RoleRoute allowedRoles={['ADMIN']} />;
};
