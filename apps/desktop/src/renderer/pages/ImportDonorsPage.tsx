import { useState } from 'react';
import {
  FileUp,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Download,
  ShieldCheck,
  UploadCloud,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PhaseNotice } from '@/components/common/PhaseNotice';

export function ImportDonorsPage() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <PhaseNotice
        featureName="Donor Ingestion Pipeline"
        description="Desktop UI pipeline for batch donor ingestion. File parsing, deduplication, and central database writes will be processed by the NestJS Ingestion service in Phase 2."
      />

      {/* Main Upload Dropzone */}
      <Card className="border-dashed border-2 border-border/80 bg-card/40 p-10 flex flex-col items-center justify-center text-center hover:border-blood-600/50 transition-colors">
        <div className="h-16 w-16 rounded-2xl bg-blood-600/10 border border-blood-600/30 flex items-center justify-center mb-4">
          <UploadCloud className="h-8 w-8 text-rose-400" />
        </div>

        <h3 className="text-base font-bold text-foreground tracking-tight">
          Stage Donor Roster for Central Ingestion
        </h3>
        <p className="max-w-md text-xs text-muted-foreground mt-1.5 leading-relaxed">
          Drag and drop clinical donor records in CSV or XLSX format, or select a file from your workstation storage.
        </p>

        <div className="flex items-center gap-3 mt-6">
          <Button
            size="sm"
            variant="clinical"
            onClick={() => setSelectedFile('demo_donors_stage_v1.csv')}
            className="text-xs"
          >
            <FileSpreadsheet className="mr-1.5 h-3.5 w-3.5" />
            Browse Workstation Files
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => alert('Sample CSV template will be provided with Phase 2 API specifications.')}
            className="text-xs"
          >
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Download Schema Spec
          </Button>
        </div>

        {selectedFile && (
          <div className="mt-4 p-2.5 rounded-md bg-secondary/60 border border-border flex items-center space-x-2 text-xs text-rose-300">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>Staged file: {selectedFile} (Awaiting Phase 2 Ingestion API)</span>
          </div>
        )}
      </Card>

      {/* Schema Specification & Validation Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-border/70 bg-card/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 mr-1.5" />
              Required Ingestion Columns
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs">
            <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between items-center">
              <code className="text-rose-300 font-mono">donor_id</code>
              <Badge variant="outline" className="text-[10px]">Unique String</Badge>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between items-center">
              <code className="text-rose-300 font-mono">blood_group</code>
              <span className="text-muted-foreground font-mono">A+, A-, B+, B-, AB+, AB-, O+, O-</span>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between items-center">
              <code className="text-rose-300 font-mono">phone_number</code>
              <span className="text-muted-foreground font-mono">E.164 International Format</span>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between items-center">
              <code className="text-rose-300 font-mono">last_donation_date</code>
              <span className="text-muted-foreground font-mono">ISO 8601 (YYYY-MM-DD)</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center">
              <AlertCircle className="h-3.5 w-3.5 text-amber-400 mr-1.5" />
              Clinical Ingestion Rules
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-muted-foreground leading-relaxed">
            <p>
              • <strong className="text-foreground">Deduplication:</strong> Ingested phone numbers and government IDs are cryptographically hashed and checked against central records.
            </p>
            <p>
              • <strong className="text-foreground">Eligibility Intervals:</strong> Donors who gave whole blood within 56 days or platelets within 7 days are automatically flagged as deferral.
            </p>
            <p>
              • <strong className="text-foreground">No Local Processing:</strong> In compliance with the Phase 1 architecture restriction, no local CSV parser writes to SQLite.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

