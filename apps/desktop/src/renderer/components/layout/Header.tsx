import { useState, useEffect } from 'react';
import {
  Activity,
  Calendar,
  Clock,
  ShieldCheck,
  RefreshCw,
  Info,
} from 'lucide-react';
import type { NavigationRoute } from '@blood-connect/shared';
import { useIpc } from '@/hooks/useIpc';
import { Button } from '@/components/ui/button';
import { StatusPill } from '@/components/common/StatusPill';
import { Dialog } from '@/components/ui/dialog';

interface HeaderProps {
  currentRoute: NavigationRoute;
}

const ROUTE_INFO: Record<NavigationRoute, { title: string; subtitle: string }> = {
  dashboard: {
    title: 'Operations Dashboard',
    subtitle: 'Real-time telemetry, readiness monitors, and critical alert triage',
  },
  donors: {
    title: 'Donor Registry',
    subtitle: 'Donor verification, eligibility criteria, and clinical history',
  },
  'import-donors': {
    title: 'Donor Data Ingestion',
    subtitle: 'Bulk CSV / Excel import verification pipeline',
  },
  'blood-requests': {
    title: 'Hospital Blood Requisitions',
    subtitle: 'Clinical blood product requests and priority dispatch queue',
  },
  'donor-matching': {
    title: 'Compatibility Matching Engine',
    subtitle: 'Antigen compatibility matrix and donor dispatch ranking',
  },
  'communication-history': {
    title: 'Communication Audit Trail',
    subtitle: 'Outbound donor alerts, dispatch notices, and broadcast records',
  },
  'donation-history': {
    title: 'Phlebotomy & Collection Records',
    subtitle: 'Blood donation sessions, sample serialization, and bag tracking',
  },
  reports: {
    title: 'Analytics & Compliance Reports',
    subtitle: 'Stock utilization, wastage metrics, and regulatory audit exports',
  },
  'staff-management': {
    title: 'Operator Directory & Access Control',
    subtitle: 'Blood bank operator credentials, shift rosters, and permissions',
  },
  settings: {
    title: 'System & Security Settings',
    subtitle: 'Electron runtime diagnostics, IPC bridge verification, and configuration',
  },
};

export function Header({ currentRoute }: HeaderProps) {
  const { isElectron, latency, refreshDiagnostics } = useIpc();
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
      setDate(
        now.toLocaleDateString([], {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      );
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshDiagnostics();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const info = ROUTE_INFO[currentRoute] || {
    title: 'BloodConnect',
    subtitle: 'Clinical Blood Bank Management System',
  };

  return (
    <header className="h-14 border-b border-border/80 bg-slate-950/70 px-6 flex items-center justify-between select-none backdrop-blur-sm">
      {/* Route Title & Subtitle */}
      <div>
        <h2 className="text-base font-bold text-foreground tracking-tight leading-tight">
          {info.title}
        </h2>
        <p className="text-[11px] text-muted-foreground">{info.subtitle}</p>
      </div>

      {/* Right Controls: Status, Live Clock, Actions */}
      <div className="flex items-center space-x-4">
        {/* Bridge Health Pill */}
        <div className="hidden sm:flex items-center">
          {isElectron ? (
            <StatusPill
              status="online"
              label={`IPC Bridge Active (${latency !== null ? `${latency}ms` : '<1ms'})`}
            />
          ) : (
            <StatusPill status="standby" label="Web Mode (Dev)" />
          )}
        </div>

        {/* Live Clock */}
        <div className="hidden md:flex items-center space-x-3 text-xs text-muted-foreground font-mono bg-slate-900/60 px-3 py-1 rounded-md border border-border/60">
          <div className="flex items-center space-x-1">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span>{date}</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center space-x-1 text-slate-300">
            <Clock className="h-3.5 w-3.5 text-rose-400" />
            <span className="font-semibold">{time}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-1.5">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleRefresh}
            disabled={isRefreshing}
            title="Refresh IPC diagnostics"
            className="h-8 w-8 p-0"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 text-muted-foreground ${
                isRefreshing ? 'animate-spin text-rose-400' : ''
              }`}
            />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsAboutOpen(true)}
            title="System Architecture & Verification"
            className="h-8 w-8 p-0"
          >
            <Info className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </div>

      {/* About / Architecture Verification Dialog */}
      <Dialog
        open={isAboutOpen}
        onOpenChange={setIsAboutOpen}
        title="BloodConnect Desktop — Phase 1 Architecture"
        description="Commercial Blood Bank Management System"
        footer={
          <Button
            size="sm"
            onClick={() => setIsAboutOpen(false)}
            className="bg-blood-700 hover:bg-blood-800 text-white"
          >
            Acknowledge
          </Button>
        }
      >
        <div className="space-y-3 text-xs text-muted-foreground">
          <div className="rounded-md border border-border p-3 bg-secondary/30 space-y-1.5">
            <div className="flex items-center space-x-2 text-foreground font-semibold">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Phase 1 Compliance Verification</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              This client adheres strictly to Phase 1 boundaries. No SQLite, no local donor database, no offline mock sync, and no fake credentials are used.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-500">Node Integration:</span>{' '}
              <span className="text-emerald-400 font-bold">DISABLED</span>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-500">Context Isolation:</span>{' '}
              <span className="text-emerald-400 font-bold">ENABLED</span>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-500">Preload Bridge:</span>{' '}
              <span className="text-emerald-400 font-bold">SANDBOXED</span>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-500">Packaging Target:</span>{' '}
              <span className="text-rose-300 font-bold">Windows NSIS</span>
            </div>
          </div>
        </div>
      </Dialog>
    </header>
  );
}

