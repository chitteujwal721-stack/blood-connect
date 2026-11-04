import { useState } from 'react';
import {
  GitCompare,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/common/EmptyState';
import { PhaseNotice } from '@/components/common/PhaseNotice';
import { BLOOD_TYPES, BloodType } from '@blood-connect/shared';

// Clinical Red Blood Cell Compatibility Matrix
const COMPATIBILITY_RULES: Record<
  BloodType,
  { canReceiveFrom: BloodType[]; canDonateTo: BloodType[] }
> = {
  'O-': {
    canReceiveFrom: ['O-'],
    canDonateTo: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
  },
  'O+': {
    canReceiveFrom: ['O-', 'O+'],
    canDonateTo: ['O+', 'A+', 'B+', 'AB+'],
  },
  'A-': {
    canReceiveFrom: ['O-', 'A-'],
    canDonateTo: ['A-', 'A+', 'AB-', 'AB+'],
  },
  'A+': {
    canReceiveFrom: ['O-', 'O+', 'A-', 'A+'],
    canDonateTo: ['A+', 'AB+'],
  },
  'B-': {
    canReceiveFrom: ['O-', 'B-'],
    canDonateTo: ['B-', 'B+', 'AB-', 'AB+'],
  },
  'B+': {
    canReceiveFrom: ['O-', 'O+', 'B-', 'B+'],
    canDonateTo: ['B+', 'AB+'],
  },
  'AB-': {
    canReceiveFrom: ['O-', 'A-', 'B-', 'AB-'],
    canDonateTo: ['AB-', 'AB+'],
  },
  'AB+': {
    canReceiveFrom: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
    canDonateTo: ['AB+'],
  },
};

export function DonorMatchingPage() {
  const [selectedRecipientType, setSelectedRecipientType] = useState<BloodType>('O-');

  const rule = COMPATIBILITY_RULES[selectedRecipientType];

  return (
    <div className="space-y-6">
      <PhaseNotice
        featureName="Compatibility Matching Engine"
        description="Clinical matching algorithms operate client-side using validated haematological rules. Full donor candidate queries and ranking will execute against the central database in Phase 2."
      />

      {/* Interactive Clinical Cross-Match Matrix */}
      <Card className="border-border/80 bg-card/60">
        <CardHeader className="pb-3 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm font-bold text-foreground">
                Clinical RBC Antigen Cross-Match Calculator
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Select patient blood group to evaluate compatible donor antigen combinations
              </p>
            </div>
            <Badge variant="clinical" className="font-mono text-[11px]">
              ABO & Rh(D) Compatible
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-4 space-y-5">
          {/* Recipient Selection */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-foreground">
              Select Patient / Recipient Blood Group:
            </span>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {BLOOD_TYPES.map((bt) => (
                <button
                  key={bt}
                  onClick={() => setSelectedRecipientType(bt)}
                  className={`py-2 px-3 rounded-lg font-mono font-bold text-sm transition-all border ${
                    selectedRecipientType === bt
                      ? 'bg-blood-700 text-white border-blood-500 shadow-md shadow-blood-900/30 ring-2 ring-blood-500/30'
                      : 'bg-secondary/40 text-muted-foreground border-border/50 hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  {bt}
                </button>
              ))}
            </div>
          </div>

          {/* Compatibility Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center space-x-1.5 text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                <span>Compatible Donors for {selectedRecipientType} Patients:</span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Patients with {selectedRecipientType} can safely receive red blood cells from:
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {rule.canReceiveFrom.map((bt) => (
                  <Badge
                    key={bt}
                    variant="outline"
                    className="border-emerald-500/40 bg-emerald-500/10 text-emerald-300 font-mono text-xs px-2.5 py-1"
                  >
                    {bt}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center space-x-1.5 text-xs font-semibold text-sky-400">
                <ArrowRight className="h-4 w-4" />
                <span>Can Donate Blood To:</span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Donors with {selectedRecipientType} can safely provide red cells to recipients with:
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {rule.canDonateTo.map((bt) => (
                  <Badge
                    key={bt}
                    variant="outline"
                    className="border-sky-500/40 bg-sky-500/10 text-sky-300 font-mono text-xs px-2.5 py-1"
                  >
                    {bt}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Matches Result Empty State */}
      <EmptyState
        icon={GitCompare}
        title="No Live Candidates in Matching Queue"
        description="The matching engine is loaded with full clinical compatibility logic. Real donor identification, distance calculation, and availability filtering will execute when connected to the Phase 2 NestJS backend."
        footerNote="Architecture Rule: Zero offline database / Zero fake donor data in Phase 1"
      />
    </div>
  );
}

