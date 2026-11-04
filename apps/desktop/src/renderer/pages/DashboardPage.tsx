import { useState } from 'react';
import {
  Activity,
  Users,
  AlertTriangle,
  ShieldCheck,
  Droplet,
  Layers,
  ArrowRight,
  Database,
  CheckCircle2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/common/EmptyState';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';
import { PhaseNotice } from '@/components/common/PhaseNotice';
import { useIpc } from '@/hooks/useIpc';
import type { NavigationRoute } from '@blood-connect/shared';

interface DashboardPageProps {
  onNavigate: (route: NavigationRoute) => void;
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const { diagnostics, isElectron } = useIpc();
  const [viewState, setViewState] = useState<'normal' | 'loading' | 'error'>('normal');

  return (
    <div className="space-y-6">
      {/* Top Banner Notice */}
      <PhaseNotice
        featureName="Workstation Dashboard"
        description="Phase 1 provides the validated desktop shell, frameless window manager, secure IPC bridge, and standard UI components. Central NestJS API and PostgreSQL data models will be attached in Phase 2."
      />

      {/* State Preview Switcher (Allows testing loading, empty, and error states) */}
      <div className="flex items-center justify-between p-3 rounded-lg border border-border/70 bg-card/40">
        <div className="flex items-center space-x-2">
          <Layers className="h-4 w-4 text-rose-400" />
          <span className="text-xs font-medium text-foreground">
            Workstation Component State Tester:
          </span>
          <span className="text-xs text-muted-foreground hidden sm:inline">
            Verify responsive UI states for clinical workflows
          </span>
        </div>

        <div className="flex items-center space-x-1.5">
          <Button
            size="sm"
            variant={viewState === 'normal' ? 'default' : 'outline'}
            onClick={() => setViewState('normal')}
            className="text-xs h-7 px-2.5"
          >
            Normal / Empty
          </Button>
          <Button
            size="sm"
            variant={viewState === 'loading' ? 'default' : 'outline'}
            onClick={() => setViewState('loading')}
            className="text-xs h-7 px-2.5"
          >
            Loading State
          </Button>
          <Button
            size="sm"
            variant={viewState === 'error' ? 'destructive' : 'outline'}
            onClick={() => setViewState('error')}
            className="text-xs h-7 px-2.5"
          >
            Error State
          </Button>
        </div>
      </div>

      {/* Conditional Rendering Based on State Tester */}
      {viewState === 'loading' && (
        <LoadingState
          message="Retrieving telemetry from Central Blood Bank Server..."
          subMessage="Simulating network synchronization stream"
        />
      )}

      {viewState === 'error' && (
        <ErrorState
          title="Telemetry Connection Timeout"
          message="Unable to reach the central blood repository. Confirm the NestJS API service is active and network boundaries permit outbound requests."
          errorCode="ERR_CENTRAL_API_OFFLINE"
          onRetry={() => setViewState('normal')}
        />
      )}

      {viewState === 'normal' && (
        <>
          {/* Key Metric Telemetry Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-border/70 bg-card/60 hover:border-border transition-colors">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Donor Registry
                </CardTitle>
                <Users className="h-4 w-4 text-rose-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-mono text-foreground">
                  0
                </div>
                <div className="flex items-center space-x-1 mt-1 text-[11px] text-muted-foreground">
                  <Database className="h-3 w-3 text-amber-400" />
                  <span>Awaiting Phase 2 API Link</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/70 bg-card/60 hover:border-border transition-colors">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Critical Requisitions
                </CardTitle>
                <AlertTriangle className="h-4 w-4 text-amber-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-mono text-foreground">
                  0
                </div>
                <div className="flex items-center space-x-1 mt-1 text-[11px] text-muted-foreground">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                  <span>Queue clear / Standby</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/70 bg-card/60 hover:border-border transition-colors">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Units in Quarantine
                </CardTitle>
                <Droplet className="h-4 w-4 text-blood-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-mono text-foreground">
                  0
                </div>
                <div className="flex items-center space-x-1 mt-1 text-[11px] text-muted-foreground">
                  <span>Lab testing pending in Phase 2</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/70 bg-card/60 hover:border-border transition-colors">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  IPC Bridge Health
                </CardTitle>
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-mono text-emerald-400">
                  {isElectron ? '100%' : 'DEV'}
                </div>
                <div className="flex items-center space-x-1 mt-1 text-[11px] text-muted-foreground font-mono">
                  <span>{diagnostics ? `${diagnostics.platform}` : 'Electron Runtime'}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Clinical Workstation Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Requisitions Queue Shell */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    Hospital Blood Requisition Queue
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Incoming emergency and routine blood component requests
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onNavigate('blood-requests')}
                  className="text-xs h-8"
                >
                  View All Requisitions
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </div>

              <EmptyState
                icon={Activity}
                title="No Active Blood Requisitions"
                description="When hospitals submit urgent blood requests via the Central API in Phase 2, they will stream directly into this prioritized triage queue."
                actionLabel="Inspect Matching Engine"
                onAction={() => onNavigate('donor-matching')}
                footerNote="PHASE 1 RESTRICTION: No local mock database active"
              />
            </div>

            {/* Right 1 Col: Quick Action Diagnostics */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">
                Workstation Operations
              </h3>

              <Card className="border-border/70 bg-card/60">
                <CardContent className="p-4 space-y-3">
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-foreground">
                      Donor Ingestion Pipeline
                    </h4>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Prepare CSV records for registry population once central API is deployed.
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="clinical"
                    onClick={() => onNavigate('import-donors')}
                    className="w-full text-xs"
                  >
                    Open Ingestion Pipeline
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border/70 bg-card/60">
                <CardContent className="p-4 space-y-3">
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-foreground">
                      Antigen Compatibility Tool
                    </h4>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Explore clinical ABO and Rh cross-match rules directly on the desktop.
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onNavigate('donor-matching')}
                    className="w-full text-xs"
                  >
                    Launch Compatibility Tool
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

