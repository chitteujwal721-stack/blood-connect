import { ShieldCheck, Cpu, HardDrive, Wifi } from 'lucide-react';
import { useIpc } from '@/hooks/useIpc';

export function StatusBar() {
  const { appInfo, diagnostics, isElectron } = useIpc();

  return (
    <footer className="h-6 bg-slate-950 border-t border-border/80 px-4 flex items-center justify-between text-[10px] text-muted-foreground select-none font-mono">
      {/* Left: Security Posture Identifiers */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1 text-emerald-400">
          <ShieldCheck className="h-3 w-3" />
          <span>Node Integration: Disabled</span>
        </div>

        <span className="text-slate-700">|</span>

        <div className="flex items-center space-x-1 text-emerald-400">
          <ShieldCheck className="h-3 w-3" />
          <span>Context Isolation: Enabled</span>
        </div>

        <span className="text-slate-700 hidden sm:inline">|</span>

        <div className="hidden sm:flex items-center space-x-1 text-emerald-400">
          <ShieldCheck className="h-3 w-3" />
          <span>CSP: Strict</span>
        </div>
      </div>

      {/* Right: Telemetry / System Specs */}
      <div className="flex items-center space-x-3">
        {diagnostics && (
          <div className="hidden md:flex items-center space-x-2 text-slate-400">
            <span className="flex items-center space-x-1">
              <Cpu className="h-3 w-3 text-slate-500" />
              <span>{diagnostics.processCpuUsagePercent}% CPU</span>
            </span>
            <span className="text-slate-700">•</span>
            <span className="flex items-center space-x-1">
              <HardDrive className="h-3 w-3 text-slate-500" />
              <span>
                {Math.round(diagnostics.freeMemoryMb / 1024)}GB Free RAM
              </span>
            </span>
          </div>
        )}

        <span className="text-slate-700 hidden md:inline">|</span>

        <div className="flex items-center space-x-1.5 text-slate-400">
          <Wifi className="h-3 w-3 text-amber-400" />
          <span>API: Phase 2 Standby</span>
        </div>

        <span className="text-slate-700">|</span>

        <span className="text-rose-400 font-semibold">
          v{appInfo?.version || '0.1.0'}
        </span>
      </div>
    </footer>
  );
}

