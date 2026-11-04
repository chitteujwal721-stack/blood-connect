import { useState } from 'react';
import {
  MessageSquare,
  Search,
  RefreshCw,
  PhoneCall,
  Clock,
  ShieldAlert,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/common/EmptyState';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';
import { PhaseNotice } from '@/components/common/PhaseNotice';

export function CommunicationHistoryPage() {
  const [filter, setFilter] = useState<'ALL' | 'SMS' | 'BROADCAST'>('ALL');
  const [viewState, setViewState] = useState<'normal' | 'loading' | 'error'>('normal');

  return (
    <div className="space-y-6">
      <PhaseNotice
        featureName="Communication Audit Trail"
        description="Architecture Restriction Enforced: Zero SMS or telephony integration in Phase 1. Outbound Twilio/telephony gateways will be implemented in later phases on the central API."
      />

      {/* Control Strip */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search communication logs by recipient, type, or date..."
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

      {/* Log Channel Tabs */}
      <div className="flex items-center space-x-2 border-b border-border/60 pb-3">
        {(['ALL', 'SMS', 'BROADCAST'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              filter === tab
                ? 'bg-blood-600 text-white font-semibold shadow-sm'
                : 'text-muted-foreground hover:bg-slate-900 hover:text-foreground'
            }`}
          >
            {tab === 'ALL' && 'All Dispatches (0)'}
            {tab === 'SMS' && 'Donor SMS Alerts (0)'}
            {tab === 'BROADCAST' && 'Emergency Broadcasts (0)'}
          </button>
        ))}
      </div>

      {/* View States */}
      {viewState === 'loading' && (
        <LoadingState
          message="Retrieving communications audit records..."
          subMessage="Connecting to central audit ledger"
        />
      )}

      {viewState === 'error' && (
        <ErrorState
          title="Audit Ledger Inaccessible"
          message="Communication ledger is hosted on the Central API. Connection scheduled for Phase 2."
          errorCode="ERR_COMM_AUDIT_UNAVAILABLE"
          onRetry={() => setViewState('normal')}
        />
      )}

      {viewState === 'normal' && (
        <EmptyState
          icon={MessageSquare}
          title="No Communication Logs Recorded"
          description="In strict adherence to project architecture restrictions, no SMS gateway, mock carrier, or local messaging stores exist in Phase 1. All outbound notifications will be executed centrally in a later phase."
          footerNote="Architecture Rule: Zero SMS integration / Zero fake telemetry in Phase 1"
        />
      )}
    </div>
  );
}

