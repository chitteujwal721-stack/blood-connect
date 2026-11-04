import React from 'react';
import { LucideIcon, Inbox } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  footerNote?: string;
  className?: string;
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  footerNote,
  className,
}: EmptyStateProps) {
  return (
    <Card
      className={`flex flex-col items-center justify-center p-12 text-center border-dashed border-border/80 bg-card/40 ${
        className || ''
      }`}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/80 border border-border/60 text-muted-foreground mb-4 shadow-inner">
        <Icon className="h-7 w-7 text-rose-400" />
      </div>
      <h3 className="text-base font-semibold text-foreground tracking-tight mb-1.5">
        {title}
      </h3>
      <p className="max-w-md text-xs text-muted-foreground leading-relaxed mb-6">
        {description}
      </p>

      {(actionLabel || secondaryActionLabel) && (
        <div className="flex items-center gap-3 mb-4">
          {actionLabel && (
            <Button
              size="sm"
              onClick={onAction}
              className="bg-blood-700 hover:bg-blood-800 text-white font-medium"
            >
              {actionLabel}
            </Button>
          )}
          {secondaryActionLabel && (
            <Button
              size="sm"
              variant="outline"
              onClick={onSecondaryAction}
              className="text-xs"
            >
              {secondaryActionLabel}
            </Button>
          )}
        </div>
      )}

      {footerNote && (
        <p className="text-[11px] text-muted-foreground/70 font-mono">
          {footerNote}
        </p>
      )}
    </Card>
  );
}

