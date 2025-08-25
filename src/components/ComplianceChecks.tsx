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

interface ComplianceChecksProps {
  applicationId?: string;
}

// Helper function to generate consistent random data based on application ID
const generateSeededRandom = (seed: string) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
};

const getRandomStatus = (seed: number, weights: { passed: number; failed: number; warning: number; pending: number }) => {
  const random = (seed * 9301 + 49297) % 233280;
  const normalized = random / 233280;
  
  if (normalized < weights.passed) return "passed";
  if (normalized < weights.passed + weights.failed) return "failed";
  if (normalized < weights.passed + weights.failed + weights.warning) return "warning";
  return "pending";
};

const getRandomFlags = (seed: number, status: string) => {
  const flagOptions = {
    kyc: [
      "Address format inconsistency",
      "Missing apartment number in utility bill",
      "ID document expired",
      "Name mismatch on documents",
      "Incomplete business registration",
      "Missing tax compliance certificate"
    ],
    aml: [
      "Similar name found in PEP database",
      "Requires manual verification of identity",
      "Previous bank has not responded to information request",
      "Manual follow-up required",
      "Suspicious transaction patterns detected",
      "High-risk jurisdiction exposure"
    ],
    pep: [
      "Former Ministry of ICT employee (2018-2020)",
      "Low-level position, minimal risk exposure",
      "Additional documentation required",
      "Source of wealth verification needed",
      "Enhanced monitoring recommended",
      "Family member in government position"
    ],
    regulatory: [
      "Client mentions blockchain consulting",
      "Potential cryptocurrency transaction risk",
      "Enhanced monitoring recommended",
      "Industry-specific compliance concerns",
      "Geographic risk factors identified",
      "Regulatory reporting requirements"
    ]
  };

  const random = (seed * 9301 + 49297) % 233280;
  const normalized = random / 233280;
  
  if (status === "passed") return [];
  
  const category = Object.keys(flagOptions)[Math.floor(normalized * 4)];
  const numFlags = Math.floor(normalized * 3) + 1;
  const shuffled = [...flagOptions[category as keyof typeof flagOptions]].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numFlags);
};

const generateComplianceData = (applicationId: string): ComplianceCheck[] => {
  const baseSeed = generateSeededRandom(applicationId);
  
  const complianceData: ComplianceCheck[] = [
    {
      category: "KYC Verification",
      checks: [
        {
          name: "Identity Verification",
          status: getRandomStatus(baseSeed + 1, { passed: 0.7, failed: 0.1, warning: 0.15, pending: 0.05 }),
          details: "National ID verification against IPRS database. Document authentic.",
          lastChecked: "2024-01-15 10:30",
          flags: getRandomFlags(baseSeed + 1, getRandomStatus(baseSeed + 1, { passed: 0.7, failed: 0.1, warning: 0.15, pending: 0.05 }))
        },
        {
          name: "Address Verification",
          status: getRandomStatus(baseSeed + 2, { passed: 0.6, failed: 0.1, warning: 0.25, pending: 0.05 }),
          details: "Utility bill address verification completed.",
          lastChecked: "2024-01-15 10:32",
          flags: getRandomFlags(baseSeed + 2, getRandomStatus(baseSeed + 2, { passed: 0.6, failed: 0.1, warning: 0.25, pending: 0.05 }))
        },
        {
          name: "Business Registration Verification",
          status: getRandomStatus(baseSeed + 3, { passed: 0.8, failed: 0.05, warning: 0.1, pending: 0.05 }),
          details: "Certificate verification with Registrar of Companies.",
          lastChecked: "2024-01-15 10:35",
          flags: getRandomFlags(baseSeed + 3, getRandomStatus(baseSeed + 3, { passed: 0.8, failed: 0.05, warning: 0.1, pending: 0.05 }))
        },
        {
          name: "Tax Compliance Check",
          status: getRandomStatus(baseSeed + 4, { passed: 0.5, failed: 0.2, warning: 0.25, pending: 0.05 }),
          details: "KRA PIN verification and tax compliance assessment.",
          lastChecked: "2024-01-15 10:40",
          flags: getRandomFlags(baseSeed + 4, getRandomStatus(baseSeed + 4, { passed: 0.5, failed: 0.2, warning: 0.25, pending: 0.05 }))
        }
      ]
    },
    {
      category: "AML Screening",
      checks: [
        {
          name: "Sanctions List Screening",
          status: getRandomStatus(baseSeed + 5, { passed: 0.9, failed: 0.05, warning: 0.03, pending: 0.02 }),
          details: "Screened against OFAC, UN, EU sanctions lists.",
          lastChecked: "2024-01-15 11:00",
          flags: getRandomFlags(baseSeed + 5, getRandomStatus(baseSeed + 5, { passed: 0.9, failed: 0.05, warning: 0.03, pending: 0.02 }))
        },
        {
          name: "Watchlist Screening",
          status: getRandomStatus(baseSeed + 6, { passed: 0.7, failed: 0.1, warning: 0.15, pending: 0.05 }),
          details: "PEP and watchlist database screening completed.",
          lastChecked: "2024-01-15 11:02",
          flags: getRandomFlags(baseSeed + 6, getRandomStatus(baseSeed + 6, { passed: 0.7, failed: 0.1, warning: 0.15, pending: 0.05 }))
        },
        {
          name: "Transaction Pattern Analysis",
          status: getRandomStatus(baseSeed + 7, { passed: 0.4, failed: 0.1, warning: 0.3, pending: 0.2 }),
          details: "Historical transaction pattern analysis.",
          lastChecked: "2024-01-15 11:10",
          flags: getRandomFlags(baseSeed + 7, getRandomStatus(baseSeed + 7, { passed: 0.4, failed: 0.1, warning: 0.3, pending: 0.2 }))
        }
      ]
    },
    {
      category: "PEP Screening",
      checks: [
        {
          name: "Political Exposure Check",
          status: getRandomStatus(baseSeed + 8, { passed: 0.8, failed: 0.05, warning: 0.1, pending: 0.05 }),
          details: "Political exposure screening completed.",
          lastChecked: "2024-01-15 11:15",
          flags: getRandomFlags(baseSeed + 8, getRandomStatus(baseSeed + 8, { passed: 0.8, failed: 0.05, warning: 0.1, pending: 0.05 }))
        },
        {
          name: "Family/Associate PEP Check",
          status: getRandomStatus(baseSeed + 9, { passed: 0.85, failed: 0.05, warning: 0.08, pending: 0.02 }),
          details: "Family and associate PEP screening completed.",
          lastChecked: "2024-01-15 11:17",
          flags: getRandomFlags(baseSeed + 9, getRandomStatus(baseSeed + 9, { passed: 0.85, failed: 0.05, warning: 0.08, pending: 0.02 }))
        },
        {
          name: "Enhanced Due Diligence",
          status: getRandomStatus(baseSeed + 10, { passed: 0.3, failed: 0.1, warning: 0.4, pending: 0.2 }),
          details: "Enhanced due diligence assessment.",
          lastChecked: "2024-01-15 11:20",
          flags: getRandomFlags(baseSeed + 10, getRandomStatus(baseSeed + 10, { passed: 0.3, failed: 0.1, warning: 0.4, pending: 0.2 }))
        }
      ]
    },
    {
      category: "Regulatory Compliance",
      checks: [
        {
          name: "CBK Licensing Check",
          status: getRandomStatus(baseSeed + 11, { passed: 0.9, failed: 0.05, warning: 0.03, pending: 0.02 }),
          details: "Central Bank of Kenya licensing verification.",
          lastChecked: "2024-01-15 11:25",
          flags: getRandomFlags(baseSeed + 11, getRandomStatus(baseSeed + 11, { passed: 0.9, failed: 0.05, warning: 0.03, pending: 0.02 }))
        },
        {
          name: "Industry Risk Assessment",
          status: getRandomStatus(baseSeed + 12, { passed: 0.6, failed: 0.1, warning: 0.25, pending: 0.05 }),
          details: "Industry-specific risk assessment completed.",
          lastChecked: "2024-01-15 11:30",
          flags: getRandomFlags(baseSeed + 12, getRandomStatus(baseSeed + 12, { passed: 0.6, failed: 0.1, warning: 0.25, pending: 0.05 }))
        },
        {
          name: "Geographic Risk Assessment",
          status: getRandomStatus(baseSeed + 13, { passed: 0.8, failed: 0.05, warning: 0.1, pending: 0.05 }),
          details: "Geographic risk assessment for Kenya jurisdiction.",
          lastChecked: "2024-01-15 11:32",
          flags: getRandomFlags(baseSeed + 13, getRandomStatus(baseSeed + 13, { passed: 0.8, failed: 0.05, warning: 0.1, pending: 0.05 }))
        }
      ]
    }
  ];

  return complianceData;
};

export const ComplianceChecks = ({ applicationId = "default" }: ComplianceChecksProps) => {
  const complianceData = generateComplianceData(applicationId);

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