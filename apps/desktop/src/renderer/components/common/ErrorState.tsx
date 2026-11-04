import { AlertTriangle, RefreshCw, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export interface ErrorStateProps {
  title?: string;
  message: string;
  errorCode?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Operational Bridge Error',
  message,
  errorCode = 'ERR_IPC_BRIDGE_TIMEOUT',
  onRetry,
  className = '',
}: ErrorStateProps) {
  return (
    <Card
      className={`p-8 border-destructive/40 bg-destructive/5 flex flex-col items-center justify-center text-center space-y-4 ${className}`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/15 border border-destructive/30 text-destructive">
        <AlertTriangle className="h-6 w-6 text-rose-500" />
      </div>

      <div className="space-y-1 max-w-md">
        <h4 className="text-sm font-semibold text-rose-300 tracking-tight">
          {title}
        </h4>
        <p className="text-xs text-muted-foreground leading-relaxed">{message}</p>
        {errorCode && (
          <div className="inline-flex items-center space-x-1.5 pt-2 text-[11px] font-mono text-muted-foreground/80">
            <ShieldAlert className="h-3 w-3 text-rose-400" />
            <span>Code: {errorCode}</span>
          </div>
        )}
      </div>

      {onRetry && (
        <div className="pt-2">
          <Button
            size="sm"
            variant="outline"
            onClick={onRetry}
            className="border-destructive/40 hover:bg-destructive/10 text-xs"
          >
            <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
            Retry Diagnostics
          </Button>
        </div>
      )}
    </Card>
  );
}

