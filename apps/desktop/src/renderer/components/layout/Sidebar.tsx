import React from 'react';
import {
  LayoutDashboard,
  Users,
  FileUp,
  Activity,
  GitCompare,
  MessageSquare,
  History,
  BarChart3,
  ShieldCheck,
  Settings,
  Droplet,
  ChevronRight,
} from 'lucide-react';
import type { NavigationRoute } from '@blood-connect/shared';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface SidebarProps {
  currentRoute: NavigationRoute;
  onNavigate: (route: NavigationRoute) => void;
}

interface NavGroup {
  label: string;
  items: {
    id: NavigationRoute;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: 'OPERATIONS',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'donors', label: 'Donors', icon: Users },
      { id: 'blood-requests', label: 'Blood Requests', icon: Activity, badge: 'Phase 1' },
    ],
  },
  {
    label: 'CLINICAL TOOLS',
    items: [
      { id: 'import-donors', label: 'Import Donors', icon: FileUp },
      { id: 'donor-matching', label: 'Donor Matching', icon: GitCompare },
    ],
  },
  {
    label: 'AUDIT & RECORDS',
    items: [
      { id: 'communication-history', label: 'Communication History', icon: MessageSquare },
      { id: 'donation-history', label: 'Donation History', icon: History },
      { id: 'reports', label: 'Reports', icon: BarChart3 },
    ],
  },
  {
    label: 'ADMINISTRATION',
    items: [
      { id: 'staff-management', label: 'Staff Management', icon: ShieldCheck },
      { id: 'settings', label: 'Settings', icon: Settings },
    ],
  },
];

export function Sidebar({ currentRoute, onNavigate }: SidebarProps) {
  return (
    <aside className="w-64 bg-slate-950/95 border-r border-border/80 flex flex-col justify-between select-none">
      {/* Top Branding Section */}
      <div className="p-4 border-b border-border/60">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blood-600 to-blood-800 flex items-center justify-center shadow-lg shadow-blood-700/20 border border-blood-500/40">
            <Droplet className="h-5 w-5 text-white fill-white/80" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-foreground tracking-tight leading-none">
              BloodConnect
            </h1>
            <p className="text-[11px] text-muted-foreground mt-1 font-mono">
              Clinical Workstation
            </p>
          </div>
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="space-y-1">
            <div className="px-3 text-[10px] font-bold tracking-wider text-muted-foreground/70 uppercase">
              {group.label}
            </div>
            <div className="space-y-0.5 pt-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentRoute === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={cn(
                      'w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-all group cursor-pointer text-left',
                      isActive
                        ? 'bg-blood-600/15 text-rose-200 border-l-2 border-blood-600 shadow-sm font-semibold'
                        : 'text-muted-foreground hover:bg-slate-900 hover:text-foreground'
                    )}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon
                        className={cn(
                          'h-4 w-4 transition-colors',
                          isActive
                            ? 'text-rose-400'
                            : 'text-muted-foreground group-hover:text-foreground'
                        )}
                      />
                      <span>{item.label}</span>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      {item.badge && (
                        <Badge
                          variant="outline"
                          className="text-[9px] py-0 px-1 border-muted-foreground/30 text-muted-foreground"
                        >
                          {item.badge}
                        </Badge>
                      )}
                      {isActive && (
                        <ChevronRight className="h-3 w-3 text-rose-400" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Station Operator Footer */}
      <div className="p-3 border-t border-border/60 bg-slate-900/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="h-7 w-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-semibold text-slate-300 font-mono">
              BB
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-medium text-foreground truncate">
                Blood Bank Console
              </p>
              <p className="text-[10px] text-muted-foreground truncate">
                Operator Station #01
              </p>
            </div>
          </div>
          <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-sm" title="Station Online" />
        </div>
      </div>
    </aside>
  );
}

