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
    flags: string[];
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
          details: "National ID 34567890 verified against IPRS database. Document authentic.",
          lastChecked: "2024-01-15 10:30",
          flags: []
        },
        {
          name: "Address Verification",
          status: "warning",
          details: "Utility bill address partially matches. Minor discrepancy in street name.",
          lastChecked: "2024-01-15 10:32",
          flags: ["Address format inconsistency", "Missing apartment number in utility bill"]
        },
        {
          name: "Business Registration Verification",
          status: "passed",
          details: "Certificate PVT-202301456 verified with Registrar of Companies. Status: Active",
          lastChecked: "2024-01-15 10:35",
          flags: []
        },
        {
          name: "Tax Compliance Check",
          status: "failed",
          details: "KRA PIN A012345678Z valid but missing recent tax returns for 2023",
          lastChecked: "2024-01-15 10:40",
          flags: ["2023 tax returns not submitted", "Outstanding VAT payment of KES 45,000", "ITax portal shows compliance rating: Medium Risk"]
        },
        {
          name: "Financial Statement Analysis",
          status: "warning",
          details: "Audited statements show declining revenue trend. Cash flow concerns noted.",
          lastChecked: "2024-01-15 10:45",
          flags: ["Revenue declined 15% YoY", "Current ratio below industry standard (1.2 vs 1.8)", "Auditor qualified opinion on going concern"]
        }
      ]
    },
    {
      category: "AML Screening",
      checks: [
        {
          name: "Sanctions List Screening",
          status: "passed",
          details: "Screened against OFAC, UN, EU sanctions lists. No matches found.",
          lastChecked: "2024-01-15 11:00",
          flags: []
        },
        {
          name: "Watchlist Screening",
          status: "warning",
          details: "Potential match found requiring manual review",
          lastChecked: "2024-01-15 11:02",
          flags: ["Similar name found in PEP database", "Requires manual verification of identity"]
        },
        {
          name: "Adverse Media Screening",
          status: "failed",
          details: "Negative media coverage identified in business publications",
          lastChecked: "2024-01-15 11:05",
          flags: ["Article about tax evasion allegations (2023)", "Court case pending - contract dispute", "Mentioned in fraud investigation report"]
        },
        {
          name: "Transaction Pattern Analysis",
          status: "pending",
          details: "Awaiting historical transaction data from previous bank",
          lastChecked: "2024-01-15 11:10",
          flags: ["Previous bank has not responded to information request", "Manual follow-up required"]
        }
      ]
    },
    {
      category: "PEP Screening",
      checks: [
        {
          name: "Political Exposure Check",
          status: "warning",
          details: "Contact person previously worked in government ministry",
          lastChecked: "2024-01-15 11:15",
          flags: ["Former Ministry of ICT employee (2018-2020)", "Low-level position, minimal risk exposure"]
        },
        {
          name: "Family/Associate PEP Check",
          status: "passed",
          details: "No known direct family associations with PEPs identified",
          lastChecked: "2024-01-15 11:17",
          flags: []
        },
        {
          name: "Enhanced Due Diligence",
          status: "pending",
          details: "EDD required due to previous government employment",
          lastChecked: "2024-01-15 11:20",
          flags: ["Additional documentation required", "Source of wealth verification needed", "Enhanced monitoring recommended"]
        }
      ]
    },
    {
      category: "Regulatory Compliance",
      checks: [
        {
          name: "CBK Licensing Check",
          status: "passed",
          details: "Business activity within permitted scope for current account services",
          lastChecked: "2024-01-15 11:25",
          flags: []
        },
        {
          name: "Industry Risk Assessment",
          status: "warning",
          details: "Technology services - Medium risk due to crypto exposure",
          lastChecked: "2024-01-15 11:30",
          flags: ["Client mentions blockchain consulting", "Potential cryptocurrency transaction risk", "Enhanced monitoring recommended"]
        },
        {
          name: "Geographic Risk Assessment",
          status: "passed",
          details: "Operating in Nairobi - low risk jurisdiction within Kenya",
          lastChecked: "2024-01-15 11:32",
          flags: []
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
                      {check.flags.length > 0 && (
                        <div className="mt-2 space-y-1">
                          <p className="text-xs font-medium text-warning">Flags:</p>
                          {check.flags.map((flag, flagIndex) => (
                            <div key={flagIndex} className="flex items-start gap-2">
                              <AlertTriangle className="h-3 w-3 text-warning mt-0.5 flex-shrink-0" />
                              <p className="text-xs text-warning">{flag}</p>
                            </div>
                          ))}
                        </div>
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