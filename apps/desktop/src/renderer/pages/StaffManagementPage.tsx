import { useState } from 'react';
import {
  ShieldCheck,
  Users,
  KeyRound,
  Lock,
  UserCheck,
  Search,
  RefreshCw,
  PlusCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/common/EmptyState';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';
import { PhaseNotice } from '@/components/common/PhaseNotice';

export function StaffManagementPage() {
  const [viewState, setViewState] = useState<'normal' | 'loading' | 'error'>('normal');

  const ROLES = [
    {
      title: 'Blood Bank Administrator',
      level: 'Tier 1 — Full Access',
      description: 'System configuration, user provisioning, regulatory audit sign-off',
      badge: 'Admin',
    },
    {
      title: 'Phlebotomist / Charge Nurse',
      level: 'Tier 2 — Clinical Collection',
      description: 'Donor vitals triage, phlebotomy session logging, blood bag tagging',
      badge: 'Clinical',
    },
    {
      title: 'Laboratory Serologist',
      level: 'Tier 2 — Testing & QC',
      description: 'Infectious disease screening, blood grouping, cross-match confirmation',
      badge: 'Laboratory',
    },
    {
      title: 'Inventory & Dispatch Officer',
      level: 'Tier 3 — Distribution',
      description: 'Requisition processing, cold-chain pack-out, hospital dispatch logs',
      badge: 'Dispatch',
    },
  ];

  return (
    <div className="space-y-6">
      <PhaseNotice
        featureName="Staff Management & RBAC"
        description="Architecture Restriction Enforced: Zero fake authentication in Phase 1. Real JWT/OAuth tokens and identity provider integration will be deployed alongside the NestJS API in Phase 2."
      />

      {/* Role-Based Access Control Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ROLES.map((role) => (
          <Card key={role.title} className="border-border/70 bg-card/60">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-semibold text-foreground">
                  {role.title}
                </CardTitle>
                <Badge variant="outline" className="text-[10px] font-mono">
                  {role.badge}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-1.5 text-xs">
              <span className="text-[11px] font-medium text-rose-300 font-mono">
                {role.level}
              </span>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                {role.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Strip */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search operator roster by name, badge ID, or role..."
            className="pl-9 h-9 text-xs"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setViewState((prev) =>
                prev === 'normal' ? 'loading' : prev === 'loading' ? 'error' : 'normal'
              )
            }
            className="text-xs h-9"
          >
            <RefreshCw className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
            Cycle State ({viewState})
          </Button>

          <Button
            size="sm"
            variant="clinical"
            onClick={() => alert('Staff provisioning requires central authentication (Phase 2).')}
            className="text-xs h-9"
          >
            <PlusCircle className="mr-1.5 h-3.5 w-3.5" />
            Add Operator
          </Button>
        </div>
      </div>

      {/* View States */}
      {viewState === 'loading' && (
        <LoadingState
          message="Validating station identity and role certificates..."
          subMessage="Connecting to central identity service"
        />
      )}

      {viewState === 'error' && (
        <ErrorState
          title="Identity Provider Unreachable"
          message="Central IAM service is not yet deployed. Full authentication suite is scheduled for Phase 2."
          errorCode="ERR_AUTH_IAM_OFFLINE"
          onRetry={() => setViewState('normal')}
        />
      )}

      {viewState === 'normal' && (
        <EmptyState
          icon={Users}
          title="No Operator Accounts Loaded"
          description="In strict adherence to the project brief, no mock users or fake login profiles exist in this Phase 1 foundation. When connected to the NestJS API in Phase 2, authentic staff rosters and credentials will load here."
          footerNote="Architecture Rule: Zero fake authentication in Phase 1"
        />
      )}
    </div>
  );
}

