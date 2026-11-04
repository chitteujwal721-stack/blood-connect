import { Droplet, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export interface LoadingStateProps {
  message?: string;
  subMessage?: string;
  showSkeleton?: boolean;
  className?: string;
}

export function LoadingState({
  message = 'Loading operational telemetry...',
  subMessage = 'Connecting to secure local IPC bridge',
  showSkeleton = true,
  className = '',
}: LoadingStateProps) {
  return (
    <Card
      className={`p-8 border border-border/60 bg-card/50 flex flex-col items-center justify-center text-center space-y-4 ${className}`}
    >
      <div className="relative flex items-center justify-center">
        <div className="absolute h-14 w-14 rounded-full bg-blood-500/10 animate-ping" />
        <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-blood-600/20 border border-blood-500/30 text-rose-400">
          <Droplet className="h-6 w-6 animate-pulse text-rose-500 fill-rose-500/40" />
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-center space-x-2">
          <Loader2 className="h-3.5 w-3.5 animate-spin text-rose-400" />
          <h4 className="text-sm font-medium text-foreground">{message}</h4>
        </div>
        <p className="text-xs text-muted-foreground">{subMessage}</p>
      </div>

      {showSkeleton && (
        <div className="w-full max-w-md pt-4 space-y-2.5">
          <Skeleton className="h-4 w-full bg-secondary/70" />
          <Skeleton className="h-4 w-5/6 bg-secondary/50 mx-auto" />
          <Skeleton className="h-4 w-3/4 bg-secondary/40 mx-auto" />
        </div>
      )}
    </Card>
  );
}

