import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, XCircle, Calendar, User, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { ApplicationDetailModal } from "./ApplicationDetailModal";

interface Application {
  id: string;
  businessName: string;
  registrationNumber: string;
  applicationType: string;
  status: "rejected";
  submittedDate: string;
  rejectedDate: string;
  rejectedBy: string;
  rejectionReason: string;
  monthlyTurnover: string;
  riskLevel: "low" | "medium" | "high";
}

export const RejectedApplications = () => {
  const [applications] = useState<Application[]>([
    {
      id: "APP-007",
      businessName: "Kisii Trading Company",
      registrationNumber: "PVT-202301462",
      applicationType: "SME Current Account",
      status: "rejected",
      submittedDate: "2024-01-08",
      rejectedDate: "2024-01-12",
      rejectedBy: "Sarah Wilson",
      rejectionReason: "Insufficient documentation - missing tax compliance certificates and outdated financial statements",
      monthlyTurnover: "KES 1,800,000",
      riskLevel: "high",
    },
    {
      id: "APP-008",
      businessName: "Malindi Fisheries Ltd",
      registrationNumber: "PVT-202301463",
      applicationType: "SME Current Account",
      status: "rejected",
      submittedDate: "2024-01-06",
      rejectedDate: "2024-01-11",
      rejectedBy: "Mike Johnson",
      rejectionReason: "High-risk industry with sanctions list match requiring enhanced due diligence not provided",
      monthlyTurnover: "KES 2,200,000",
      riskLevel: "high",
    },
    {
      id: "APP-009",
      businessName: "Garissa Transport Services",
      registrationNumber: "PVT-202301464",
      applicationType: "SME Current Account",
      status: "rejected",
      submittedDate: "2024-01-05",
      rejectedDate: "2024-01-10",
      rejectedBy: "Jane Smith",
      rejectionReason: "PEP screening concerns - beneficial owner has undisclosed political connections",
      monthlyTurnover: "KES 3,500,000",
      riskLevel: "high",
    },
  ]);

  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewClick = (applicationId: string) => {
    setSelectedApplicationId(applicationId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedApplicationId(null);
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "low":
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20">Low Risk</Badge>;
      case "medium":
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">Medium Risk</Badge>;
      case "high":
        return <Badge variant="secondary" className="bg-destructive/10 text-destructive border-destructive/20">High Risk</Badge>;
      default:
        return <Badge variant="secondary">{risk}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Rejected Applications
        </h2>
        <p className="text-muted-foreground">
          Review rejected applications and their rejection reasons
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Rejected Applications ({applications.length})
            <Button variant="outline" size="sm">
              Export Report
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {applications.map((app) => (
              <div
                key={app.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <XCircle className="h-4 w-4 text-destructive" />
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{app.businessName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {app.registrationNumber} • Submitted: {app.submittedDate}
                    </p>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        Rejected: {app.rejectedDate}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <User className="h-3 w-3" />
                        By: {app.rejectedBy}
                      </div>
                    </div>
                    <div className="mt-2 p-2 bg-destructive/5 rounded border-l-2 border-destructive/20">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-3 w-3 text-destructive mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-medium text-destructive">Rejection Reason:</p>
                          <p className="text-xs text-destructive/80">{app.rejectionReason}</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Monthly Turnover: {app.monthlyTurnover}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="destructive">
                    Rejected
                  </Badge>
                  {getRiskBadge(app.riskLevel)}
                  <Button variant="ghost" size="sm" onClick={() => handleViewClick(app.id)}>
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Application Detail Modal */}
      {selectedApplicationId && (
        <ApplicationDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          applicationId={selectedApplicationId}
          applicationStatus="rejected"
        />
      )}
    </div>
  );
};
