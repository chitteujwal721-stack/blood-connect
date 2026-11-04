import { cn } from '@/lib/utils';

export interface StatusPillProps {
  status: 'online' | 'standby' | 'busy' | 'error' | 'critical';
  label: string;
  className?: string;
}

export function StatusPill({ status, label, className }: StatusPillProps) {
  const styles = {
    online: {
      container: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
      dot: 'bg-emerald-400',
      ping: 'bg-emerald-400',
    },
    standby: {
      container: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
      dot: 'bg-amber-400',
      ping: 'bg-amber-400',
    },
    busy: {
      container: 'border-sky-500/30 bg-sky-500/10 text-sky-300',
      dot: 'bg-sky-400',
      ping: 'bg-sky-400',
    },
    error: {
      container: 'border-rose-500/30 bg-rose-500/10 text-rose-300',
      dot: 'bg-rose-400',
      ping: 'bg-rose-400',
    },
    critical: {
      container: 'border-red-600/50 bg-red-600/20 text-red-200',
      dot: 'bg-red-500',
      ping: 'bg-red-500',
    },
  }[status];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border shadow-sm select-none',
        styles.container,
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        <span
          className={cn(
            'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
            styles.ping
          )}
        />
        <span
          className={cn('relative inline-flex rounded-full h-2 w-2', styles.dot)}
        />
      </span>
      {label}
    </span>
  );
}

