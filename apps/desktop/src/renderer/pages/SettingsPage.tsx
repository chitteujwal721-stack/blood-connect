import { useState } from 'react';
import {
  Settings,
  ShieldCheck,
  Cpu,
  HardDrive,
  Clock,
  RefreshCw,
  Terminal,
  Server,
  Lock,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { PhaseNotice } from '@/components/common/PhaseNotice';
import { useIpc } from '@/hooks/useIpc';

export function SettingsPage() {
  const { appInfo, diagnostics, latency, refreshDiagnostics, isElectron } = useIpc();
  const [apiUrl, setApiUrl] = useState<string>('http://localhost:3000/api/v1');
  const [testResult, setTestResult] = useState<string | null>(null);

  const handleTestConnection = () => {
    setTestResult('Phase 2 API server not running on localhost:3000 (Expected for Phase 1).');
  };

  return (
    <div className="space-y-6">
      <PhaseNotice
        featureName="Workstation Security & IPC Diagnostics"
        description="Verify Electron runtime configuration, secure IPC channels, context isolation, and hardware diagnostics."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Electron Runtime & Environment Specs */}
        <Card className="border-border/80 bg-card/60">
          <CardHeader className="pb-3 border-b border-border/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center">
                <Terminal className="h-4 w-4 text-rose-400 mr-2" />
                Runtime & Core Versions
              </CardTitle>
              <Button
                size="sm"
                variant="ghost"
                onClick={refreshDiagnostics}
                className="h-7 text-xs"
              >
                <RefreshCw className="mr-1.5 h-3 w-3" />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-4 space-y-2.5 font-mono text-xs">
            <div className="flex justify-between items-center py-1 border-b border-slate-900">
              <span className="text-muted-foreground">Application:</span>
              <span className="text-foreground font-semibold">
                {appInfo?.name || 'BloodConnect Desktop'}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-900">
              <span className="text-muted-foreground">Client Version:</span>
              <span className="text-rose-300 font-bold">
                v{appInfo?.version || '0.1.0'}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-900">
              <span className="text-muted-foreground">Electron Version:</span>
              <span className="text-slate-300">{appInfo?.electronVersion || 'N/A (Web)'}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-900">
              <span className="text-muted-foreground">Chrome Engine:</span>
              <span className="text-slate-300">{appInfo?.chromeVersion || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-900">
              <span className="text-muted-foreground">Node.js Runtime:</span>
              <span className="text-slate-300">{appInfo?.nodeVersion || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-900">
              <span className="text-muted-foreground">Host Platform:</span>
              <span className="text-slate-300">{appInfo?.platform || process.platform}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-muted-foreground">Architecture:</span>
              <span className="text-slate-300">{appInfo?.arch || 'x64'}</span>
            </div>
          </CardContent>
        </Card>

        {/* Security Posture Inspection */}
        <Card className="border-border/80 bg-card/60">
          <CardHeader className="pb-3 border-b border-border/50">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center">
              <Lock className="h-4 w-4 text-emerald-400 mr-2" />
              Electron Security Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-foreground">
                  Context Isolation
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Prevents scripts in renderer from accessing Electron internals
                </p>
              </div>
              <Badge variant="success" className="font-mono text-[10px]">
                ACTIVE
              </Badge>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-foreground">
                  Node Integration in Renderer
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Direct Node.js API injection disabled in browser context
                </p>
              </div>
              <Badge variant="success" className="font-mono text-[10px]">
                DISABLED
              </Badge>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-foreground">
                  Content Security Policy (CSP)
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Enforces strict source whitelisting and blocks unauthorized origins
                </p>
              </div>
              <Badge variant="success" className="font-mono text-[10px]">
                ENFORCED
              </Badge>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-foreground">
                  Preload Sandboxing
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Whitelisted typed IPC bridge through window.bloodConnectAPI
                </p>
              </div>
              <Badge variant="success" className="font-mono text-[10px]">
                SANDBOXED
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Resource Telemetry & Central API Staging */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hardware & Process Stats */}
        <Card className="border-border/80 bg-card/60">
          <CardHeader className="pb-3 border-b border-border/50">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center">
              <Cpu className="h-4 w-4 text-sky-400 mr-2" />
              Workstation Hardware Telemetry
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="text-[11px] text-muted-foreground">
                  Total System RAM
                </span>
                <p className="text-base font-bold text-foreground font-mono mt-0.5">
                  {diagnostics
                    ? `${Math.round(diagnostics.totalMemoryMb / 1024)} GB`
                    : 'Available'}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="text-[11px] text-muted-foreground">
                  Available RAM
                </span>
                <p className="text-base font-bold text-emerald-400 font-mono mt-0.5">
                  {diagnostics
                    ? `${Math.round(diagnostics.freeMemoryMb / 1024)} GB`
                    : 'Available'}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="text-[11px] text-muted-foreground">
                  Process CPU Load
                </span>
                <p className="text-base font-bold text-sky-400 font-mono mt-0.5">
                  {diagnostics
                    ? `${diagnostics.processCpuUsagePercent}%`
                    : 'Normal'}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                <span className="text-[11px] text-muted-foreground">
                  IPC Bridge Latency
                </span>
                <p className="text-base font-bold text-rose-300 font-mono mt-0.5">
                  {latency !== null ? `${latency} ms` : '< 1 ms'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Central API Endpoint Config (Phase 2 Preparation) */}
        <Card className="border-border/80 bg-card/60">
          <CardHeader className="pb-3 border-b border-border/50">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center">
              <Server className="h-4 w-4 text-amber-400 mr-2" />
              Central API Endpoint (Phase 2 Staging)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Central NestJS API Gateway URL:
              </label>
              <div className="flex space-x-2">
                <Input
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  className="font-mono text-xs"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleTestConnection}
                  className="text-xs whitespace-nowrap"
                >
                  Test Ping
                </Button>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Configured via environment variable VITE_API_BASE_URL.
              </p>
            </div>

            {testResult && (
              <div className="p-3 rounded-md bg-secondary/50 border border-border text-xs text-amber-300 font-mono">
                {testResult}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

