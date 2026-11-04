import { useState } from 'react';
import {
  BarChart3,
  FileText,
  Download,
  Calendar,
  Filter,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/common/EmptyState';
import { PhaseNotice } from '@/components/common/PhaseNotice';

export function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<string>('inventory');

  const REPORTS = [
    {
      id: 'inventory',
      title: 'Blood Stock & Expiry Audit',
      description: 'Component shelf-life tracking, quarantine inventory, and wastage logs',
      cadence: 'Daily / Weekly',
    },
    {
      id: 'compatibility',
      title: 'Donor-Recipient Match Efficiency',
      description: 'Fulfillment speed for emergency hospital requisitions by ABO group',
      cadence: 'Monthly',
    },
    {
      id: 'retention',
      title: 'Donor Demographics & Retention',
      description: 'First-time vs repeat donor participation and voluntary donation patterns',
      cadence: 'Quarterly',
    },
    {
      id: 'compliance',
      title: 'Regulatory & Quality Control Audit',
      description: 'Cold chain storage compliance, screening test validation, and recall history',
      cadence: 'Annual',
    },
  ];

  return (
    <div className="space-y-6">
      <PhaseNotice
        featureName="Compliance & Analytics Reports"
        description="Phase 1 defines the reporting suite schemas. Data generation and cryptographic export signing will be executed by NestJS backend analytics jobs in Phase 2."
      />

      {/* Reports Catalog */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {REPORTS.map((report) => (
          <Card
            key={report.id}
            onClick={() => setSelectedReport(report.id)}
            className={`cursor-pointer transition-all border ${
              selectedReport === report.id
                ? 'border-blood-600 bg-blood-950/20 shadow-md ring-1 ring-blood-500/20'
                : 'border-border/70 bg-card/60 hover:border-border'
            }`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-bold text-foreground">
                  {report.title}
                </CardTitle>
                <Badge variant="outline" className="text-[10px]">
                  {report.cadence}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-muted-foreground leading-relaxed">
                {report.description}
              </p>
              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-border/40">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    alert('Export generation will be available upon Central API connection in Phase 2.');
                  }}
                  className="text-xs h-7 px-2.5"
                >
                  <Download className="mr-1 h-3 w-3" /> Export CSV
                </Button>
                <Button
                  size="sm"
                  variant="clinical"
                  onClick={(e) => {
                    e.stopPropagation();
                    alert('PDF report generation scheduled for Phase 2.');
                  }}
                  className="text-xs h-7 px-2.5"
                >
                  <FileText className="mr-1 h-3 w-3" /> Generate PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State for Generated Reports View */}
      <EmptyState
        icon={BarChart3}
        title="No Pre-Generated Reports Staged"
        description="Select an audit template above to schedule generation. Automated reports will be compiled by backend workers and delivered directly to this desktop console in Phase 2."
        footerNote="Architecture Rule: Zero offline database / Zero fake donor data in Phase 1"
      />
    </div>
  );
}

