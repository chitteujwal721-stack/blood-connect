import { Droplet, Minus, Square, Copy, X } from 'lucide-react';
import { useIpc } from '@/hooks/useIpc';
import { Badge } from '@/components/ui/badge';

export function TitleBar() {
  const { isElectron, isMaximized, minimize, maximize, close } = useIpc();

  return (
    <header className="h-9 w-full bg-slate-950/90 border-b border-border/80 flex items-center justify-between select-none app-drag z-50 px-2.5 backdrop-blur-md">
      {/* Brand & Client Identification */}
      <div className="flex items-center space-x-2.5 app-no-drag">
        <div className="flex items-center justify-center h-5 w-5 rounded-md bg-blood-600/30 border border-blood-500/50 shadow-sm">
          <Droplet className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold tracking-tight text-slate-100">
            BloodConnect
          </span>
          <span className="text-[11px] text-muted-foreground hidden sm:inline">
            — Blood Bank Management System
          </span>
        </div>
        <Badge
          variant="outline"
          className="text-[9px] py-0 px-1.5 h-4 border-blood-600/40 text-rose-300 font-mono hidden md:inline-flex"
        >
          COMMERCIAL CLIENT
        </Badge>
      </div>

      {/* Center Status / Safe Security Notice */}
      <div className="text-[11px] text-muted-foreground/60 hidden lg:flex items-center space-x-1.5 font-mono">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
        <span>Secure Sandbox | Context Isolation Active</span>
      </div>

      {/* Windows Window Controls */}
      <div className="flex items-center app-no-drag -mr-2.5">
        <button
          onClick={minimize}
          title="Minimize"
          className="h-9 w-11 inline-flex items-center justify-center text-muted-foreground hover:bg-slate-800/80 hover:text-foreground transition-colors cursor-pointer"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>

        <button
          onClick={maximize}
          title={isMaximized ? 'Restore' : 'Maximize'}
          className="h-9 w-11 inline-flex items-center justify-center text-muted-foreground hover:bg-slate-800/80 hover:text-foreground transition-colors cursor-pointer"
        >
          {isMaximized ? (
            <Copy className="h-3 w-3" />
          ) : (
            <Square className="h-3 w-3" />
          )}
        </button>

        <button
          onClick={close}
          title="Close"
          className="h-9 w-11 inline-flex items-center justify-center text-muted-foreground hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}

