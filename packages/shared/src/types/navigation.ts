/**
 * Navigation item identifiers for BloodConnect Desktop application
 */

export type NavigationRoute =
  | 'dashboard'
  | 'donors'
  | 'import-donors'
  | 'blood-requests'
  | 'donor-matching'
  | 'communication-history'
  | 'donation-history'
  | 'reports'
  | 'staff-management'
  | 'settings';

export interface NavigationItem {
  id: NavigationRoute;
  label: string;
  description: string;
  category: 'core' | 'operations' | 'records' | 'admin';
  icon: string;
  badge?: string;
}

export const NAVIGATION_ITEMS: readonly NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    description: 'Real-time overview of blood bank operations and critical alerts',
    category: 'core',
    icon: 'LayoutDashboard',
  },
  {
    id: 'donors',
    label: 'Donors',
    description: 'Donor registry, eligibility verification, and profiles',
    category: 'core',
    icon: 'Users',
  },
  {
    id: 'import-donors',
    label: 'Import Donors',
    description: 'Bulk CSV / Excel donor registry ingestion pipeline',
    category: 'operations',
    icon: 'FileUp',
  },
  {
    id: 'blood-requests',
    label: 'Blood Requests',
    description: 'Hospital blood unit requisitions, triage, and status',
    category: 'operations',
    icon: 'Activity',
  },
  {
    id: 'donor-matching',
    label: 'Donor Matching',
    description: 'Compatible donor algorithmic matching engine',
    category: 'operations',
    icon: 'GitCompare',
  },
  {
    id: 'communication-history',
    label: 'Communication History',
    description: 'Outbound donor communication and notification logs',
    category: 'records',
    icon: 'MessageSquare',
  },
  {
    id: 'donation-history',
    label: 'Donation History',
    description: 'Phlebotomy session records and unit collection audit trail',
    category: 'records',
    icon: 'History',
  },
  {
    id: 'reports',
    label: 'Reports',
    description: 'Operational analytics, stock audit, and compliance reports',
    category: 'records',
    icon: 'BarChart3',
  },
  {
    id: 'staff-management',
    label: 'Staff Management',
    description: 'Blood bank operator accounts, roles, and shift tracking',
    category: 'admin',
    icon: 'ShieldAlert',
  },
  {
    id: 'settings',
    label: 'Settings',
    description: 'Client diagnostics, security profiles, and system preferences',
    category: 'admin',
    icon: 'Settings',
  },
] as const;

