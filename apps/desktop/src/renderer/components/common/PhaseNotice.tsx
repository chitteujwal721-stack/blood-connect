import { Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export interface PhaseNoticeProps {
  featureName: string;
  description?: string;
  className?: string;
}

export function PhaseNotice({
  featureName,
  description = 'In Phase 1, the desktop foundation, secure IPC bridge, and UI architecture are verified. Central NestJS API synchronization will be integrated in Phase 2.',
  className = '',
}: PhaseNoticeProps) {
  return (
    <Alert variant="clinical" className={`border-blood-600/30 ${className}`}>
      <Info className="h-4 w-4 text-rose-400" />
      <AlertTitle className="text-xs font-semibold text-rose-200">
        Phase 1 Architecture Status — {featureName}
      </AlertTitle>
      <AlertDescription className="text-[11px] text-muted-foreground mt-0.5">
        {description}
      </AlertDescription>
    </Alert>
  );
}

