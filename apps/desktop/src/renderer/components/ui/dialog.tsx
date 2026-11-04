import * as React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  className,
}: DialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in-0">
      <div
        className={cn(
          'relative w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-2xl duration-200 animate-in zoom-in-95',
          className
        )}
      >
        <div className="flex items-start justify-between pb-4 border-b border-border/50">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              {title}
            </h2>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-sm opacity-70 transition-opacity hover:opacity-100 p-1 hover:bg-accent text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </div>

        <div className="py-4">{children}</div>

        {footer && (
          <div className="flex items-center justify-end space-x-2 pt-4 border-t border-border/50">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

