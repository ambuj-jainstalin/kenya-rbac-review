import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";

interface ComplianceCheck {
  category: string;
  checks: {
    name: string;
    status: "passed" | "failed" | "pending" | "warning";
    details?: string;
    lastChecked: string;
  }[];
}

export const ComplianceChecks = () => {
  const complianceData: ComplianceCheck[] = [
    {
      category: "KYC Verification",
      checks: [
        {
          name: "Identity Verification",
          status: "passed",
          details: "National ID verified against IPRS database",
          lastChecked: "2024-01-15 10:30"
        },
        {
          name: "Address Verification",
          status: "passed",
          details: "Utility bill matches provided address",
          lastChecked: "2024-01-15 10:32"
        },
        {
          name: "Business Registration Verification",
          status: "passed",
          details: "Certificate verified with Registrar of Companies",
          lastChecked: "2024-01-15 10:35"
        },
        {
          name: "Tax Compliance Check",
          status: "warning",
          details: "KRA PIN valid but recent tax returns pending review",
          lastChecked: "2024-01-15 10:40"
        },
        {
          name: "Financial Statement Analysis",
          status: "passed",
          details: "Audited statements show stable financial position",
          lastChecked: "2024-01-15 10:45"
        }
      ]
    },
    {
      category: "AML Screening",
      checks: [
        {
          name: "Sanctions List Screening",
          status: "passed",
          details: "No matches found in international sanctions lists",
          lastChecked: "2024-01-15 11:00"
        },
        {
          name: "Watchlist Screening",
          status: "passed",
          details: "No matches in global watchlists",
          lastChecked: "2024-01-15 11:02"
        },
        {
          name: "Adverse Media Screening",
          status: "passed",
          details: "No negative media coverage identified",
          lastChecked: "2024-01-15 11:05"
        },
        {
          name: "Transaction Pattern Analysis",
          status: "pending",
          details: "Awaiting historical transaction data",
          lastChecked: "2024-01-15 11:10"
        }
      ]
    },
    {
      category: "PEP Screening",
      checks: [
        {
          name: "Political Exposure Check",
          status: "passed",
          details: "No political exposure identified",
          lastChecked: "2024-01-15 11:15"
        },
        {
          name: "Family/Associate PEP Check",
          status: "passed",
          details: "No known associations with PEPs",
          lastChecked: "2024-01-15 11:17"
        },
        {
          name: "Enhanced Due Diligence",
          status: "passed",
          details: "Standard risk profile - no EDD required",
          lastChecked: "2024-01-15 11:20"
        }
      ]
    },
    {
      category: "Regulatory Compliance",
      checks: [
        {
          name: "CBK Licensing Check",
          status: "passed",
          details: "Business activity within permitted scope",
          lastChecked: "2024-01-15 11:25"
        },
        {
          name: "Industry Risk Assessment",
          status: "passed",
          details: "Technology services - Low risk industry",
          lastChecked: "2024-01-15 11:30"
        },
        {
          name: "Geographic Risk Assessment",
          status: "passed",
          details: "Operating in low-risk jurisdiction",
          lastChecked: "2024-01-15 11:32"
        }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-destructive" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "pending":
        return <Info className="h-4 w-4 text-info" />;
      default:
        return <Info className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "passed":
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20">Passed</Badge>;
      case "failed":
        return <Badge variant="secondary" className="bg-destructive/10 text-destructive border-destructive/20">Failed</Badge>;
      case "warning":
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">Warning</Badge>;
      case "pending":
        return <Badge variant="secondary" className="bg-info/10 text-info border-info/20">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {complianceData.map((category, categoryIndex) => (
        <Card key={categoryIndex}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {category.category}
              <div className="flex gap-2">
                {category.checks.filter(c => c.status === "passed").length > 0 && (
                  <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                    {category.checks.filter(c => c.status === "passed").length} Passed
                  </Badge>
                )}
                {category.checks.filter(c => c.status === "failed").length > 0 && (
                  <Badge variant="secondary" className="bg-destructive/10 text-destructive border-destructive/20">
                    {category.checks.filter(c => c.status === "failed").length} Failed
                  </Badge>
                )}
                {category.checks.filter(c => c.status === "warning").length > 0 && (
                  <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">
                    {category.checks.filter(c => c.status === "warning").length} Warnings
                  </Badge>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {category.checks.map((check, checkIndex) => (
                <div
                  key={checkIndex}
                  className="flex items-start justify-between p-3 border border-border rounded-lg"
                >
                  <div className="flex items-start gap-3">
                    {getStatusIcon(check.status)}
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{check.name}</h4>
                      {check.details && (
                        <p className="text-sm text-muted-foreground mt-1">{check.details}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        Last checked: {check.lastChecked}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(check.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};