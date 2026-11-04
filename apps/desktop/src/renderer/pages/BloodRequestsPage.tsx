import { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Search,
  Filter,
  PlusCircle,
  RefreshCw,
  Clock,
  Building2,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/common/EmptyState';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';
import { PhaseNotice } from '@/components/common/PhaseNotice';

export function BloodRequestsPage() {
  const [filterTab, setFilterTab] = useState<'ALL' | 'CRITICAL' | 'URGENT' | 'ROUTINE'>('ALL');
  const [viewState, setViewState] = useState<'normal' | 'loading' | 'error'>('normal');

  return (
    <div className="space-y-6">
      <PhaseNotice
        featureName="Hospital Blood Requisitions"
        description="Requisition management shell. Regional hospital integration and automated triage dispatch will be handled by the NestJS API in Phase 2."
      />

      {/* Action Strip */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by hospital, requisition ID, or component..."
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

          <Button
            size="sm"
            variant="clinical"
            onClick={() => alert('New Blood Request submission requires central hospital authentication (Phase 2).')}
            className="text-xs h-9"
          >
            <PlusCircle className="mr-1.5 h-3.5 w-3.5" />
            New Requisition
          </Button>
        </div>
      </div>

      {/* Priority Filters */}
      <div className="flex items-center space-x-2 border-b border-border/60 pb-3">
        {(['ALL', 'CRITICAL', 'URGENT', 'ROUTINE'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilterTab(tab)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              filterTab === tab
                ? 'bg-blood-600 text-white font-semibold shadow-sm'
                : 'text-muted-foreground hover:bg-slate-900 hover:text-foreground'
            }`}
          >
            {tab === 'ALL' && 'All Requisitions (0)'}
            {tab === 'CRITICAL' && 'Critical Priority (0)'}
            {tab === 'URGENT' && 'Urgent (0)'}
            {tab === 'ROUTINE' && 'Routine (0)'}
          </button>
        ))}
      </div>

      {/* View States */}
      {viewState === 'loading' && (
        <LoadingState
          message="Polling hospital emergency requisition queue..."
          subMessage="Connecting to central dispatch channel"
        />
      )}

      {viewState === 'error' && (
        <ErrorState
          title="Requisition Service Disconnected"
          message="Unable to reach hospital dispatch broker. Phase 2 NestJS backend is required for live queueing."
          errorCode="ERR_REQUISITION_BROKER_TIMEOUT"
          onRetry={() => setViewState('normal')}
        />
      )}

      {viewState === 'normal' && (
        <EmptyState
          icon={Activity}
          title="No Requisitions In Queue"
          description="There are currently no active blood unit requisitions pending triage. In Phase 2, requisitions submitted by regional hospitals will be received in real time."
          actionLabel="Refresh Requisition Feed"
          onAction={() => setViewState('loading')}
          footerNote="Architecture Rule: Zero offline database / Zero fake donor data in Phase 1"
        />
      )}
    </div>
  );
}

