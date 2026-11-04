import { useState } from 'react';
import {
  Users,
  Search,
  RefreshCw,
  Filter,
  FileUp,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/common/EmptyState';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';
import { PhaseNotice } from '@/components/common/PhaseNotice';
import { BLOOD_TYPES, BloodType } from '@blood-connect/shared';

interface DonorsPageProps {
  onNavigateImport: () => void;
}

export function DonorsPage({ onNavigateImport }: DonorsPageProps) {
  const [selectedGroup, setSelectedGroup] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewState, setViewState] = useState<'normal' | 'loading' | 'error'>('normal');

  return (
    <div className="space-y-6">
      <PhaseNotice
        featureName="Donor Registry"
        description="Local donor database creation is prohibited by Phase 1 architecture rules. Donor records will sync over authenticated REST/WebSocket channels with NestJS in Phase 2."
      />

      {/* Control Strip */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search donors by ID, phone, or blood group..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>

        {/* State Toggle & Import Action */}
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
            onClick={onNavigateImport}
            className="text-xs h-9"
          >
            <FileUp className="mr-1.5 h-3.5 w-3.5" />
            Import Donor Data
          </Button>
        </div>
      </div>

      {/* Blood Group Filter Chips */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs">
        <span className="text-muted-foreground font-medium mr-1 text-[11px] flex items-center">
          <Filter className="h-3 w-3 mr-1" /> Group:
        </span>
        <button
          onClick={() => setSelectedGroup('ALL')}
          className={`px-2.5 py-1 rounded-md font-mono text-xs transition-colors ${
            selectedGroup === 'ALL'
              ? 'bg-blood-600 text-white font-bold'
              : 'bg-secondary/60 text-muted-foreground hover:text-foreground'
          }`}
        >
          ALL
        </button>
        {BLOOD_TYPES.map((bt) => (
          <button
            key={bt}
            onClick={() => setSelectedGroup(bt)}
            className={`px-2.5 py-1 rounded-md font-mono text-xs transition-colors ${
              selectedGroup === bt
                ? 'bg-blood-600 text-white font-bold shadow-sm'
                : 'bg-secondary/60 text-muted-foreground hover:text-foreground'
            }`}
          >
            {bt}
          </button>
        ))}
      </div>

      {/* View States */}
      {viewState === 'loading' && (
        <LoadingState
          message="Synchronizing donor registry with central bank..."
          subMessage="Streaming cryptographic tokens and eligibility records"
        />
      )}

      {viewState === 'error' && (
        <ErrorState
          title="Registry Synchronization Fault"
          message="Failed to establish secure handshake with NestJS endpoint. Central database connection is planned for Phase 2."
          errorCode="ERR_DONOR_SYNC_UNREACHABLE"
          onRetry={() => setViewState('normal')}
        />
      )}

      {viewState === 'normal' && (
        <EmptyState
          icon={Users}
          title="No Donor Records Loaded"
          description="In strict adherence to Phase 1 architecture restrictions, no mock or local SQLite donor databases are initialized on this desktop workstation. Once the central NestJS API is connected in Phase 2, donors will be displayed here."
          actionLabel="Go to Import Donors"
          onAction={onNavigateImport}
          footerNote="Architecture Rule: Zero offline database / Zero fake donor data in Phase 1"
        />
      )}
    </div>
  );
}

