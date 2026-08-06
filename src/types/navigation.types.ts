import { LucideIcon } from 'lucide-react';
import { UserRole } from './auth.types';

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
  roles?: UserRole[];
  children?: NavItem[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}
