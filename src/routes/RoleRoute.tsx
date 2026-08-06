import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types/auth.types';
import { hasAnyRole } from '../utils/roleHelpers';

export interface RoleRouteProps {
  allowedRoles: UserRole[];
}

export const RoleRoute: React.FC<RoleRouteProps> = ({ allowedRoles }) => {
  const { user } = useAuth();

  if (!user || !hasAnyRole(user.role, allowedRoles)) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
};
