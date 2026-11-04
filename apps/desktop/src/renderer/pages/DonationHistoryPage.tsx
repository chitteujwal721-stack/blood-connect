import { useState } from 'react';
import {
  History,
  Search,
  RefreshCw,
  Droplet,
  Calendar,
  Layers,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/common/EmptyState';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';
import { PhaseNotice } from '@/components/common/PhaseNotice';

export function DonationHistoryPage() {
  const [viewState, setViewState] = useState<'normal' | 'loading' | 'error'>('normal');

  return (
    <div className="space-y-6">
      <PhaseNotice
        featureName="Phlebotomy & Collection History"
        description="Historical collection logs, viral marker screening results, and blood unit serialization records will stream from the central NestJS database in Phase 2."
      />

      {/* Control Strip */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search collection sessions by Bag DIN, donor ID, or operator..."
            className="pl-9 h-9 text-xs"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setViewState((prev) =>
                prev === 'normal' ? 'loading' : prev === 'loading' ? 'error' : 'normal'
              )
            }
            className="text-xs h-9"
          >
            <RefreshCw className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
            Cycle State ({viewState})
          </Button>
        </div>
      </div>

      {/* View States */}
      {viewState === 'loading' && (
        <LoadingState
          message="Retrieving phlebotomy donation ledger..."
          subMessage="Fetching ISBT 128 bag barcodes from central storage"
        />
      )}

      {viewState === 'error' && (
        <ErrorState
          title="Collection Database Offline"
          message="Central Phlebotomy repository is unreachable. Database integration begins in Phase 2."
          errorCode="ERR_PHLEBOTOMY_DB_OFFLINE"
          onRetry={() => setViewState('normal')}
        />
      )}

      {viewState === 'normal' && (
        <EmptyState
          icon={History}
          title="No Phlebotomy Records Ingested"
          description="Donation sessions, test tube serialization (ISBT 128), and component separation logs will be rendered here once the Central API is deployed in Phase 2."
          footerNote="Architecture Rule: Zero offline database / Zero fake donor data in Phase 1"
        />
      )}
    </div>
  );
}

