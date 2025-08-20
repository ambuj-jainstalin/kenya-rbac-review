import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import { useState } from "react";
import { ApplicationDetailModal } from "./ApplicationDetailModal";

interface Application {
  id: string;
  businessName: string;
  registrationNumber: string;
  applicationType: string;
  status: "pending" | "review" | "approved" | "rejected" | "flagged";
  submittedDate: string;
  monthlyTurnover: string;
  riskLevel: "low" | "medium" | "high";
}

export const ApplicationsList = () => {
  const [applications] = useState<Application[]>([
    {
      id: "APP-001",
      businessName: "Nairobi Tech Solutions Ltd",
      registrationNumber: "PVT-202301456",
      applicationType: "SME Current Account",
      status: "pending",
      submittedDate: "2024-01-15",
      monthlyTurnover: "KES 2,500,000",
      riskLevel: "low",
    },
    {
      id: "APP-002",
      businessName: "Mombasa Import Export Co.",
      registrationNumber: "PVT-202301457",
      applicationType: "SME Current Account",
      status: "flagged",
      submittedDate: "2024-01-14",
      monthlyTurnover: "KES 8,750,000",
      riskLevel: "high",
    },
    {
      id: "APP-003",
      businessName: "Kisumu Agricultural Services",
      registrationNumber: "PVT-202301458",
      applicationType: "SME Current Account",
      status: "review",
      submittedDate: "2024-01-13",
      monthlyTurnover: "KES 1,200,000",
      riskLevel: "medium",
    },
    {
      id: "APP-004",
      businessName: "Eldoret Manufacturing Ltd",
      registrationNumber: "PVT-202301459",
      applicationType: "SME Current Account",
      status: "approved",
      submittedDate: "2024-01-12",
      monthlyTurnover: "KES 4,500,000",
      riskLevel: "low",
    },
  ]);

  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReviewClick = (applicationId: string) => {
    setSelectedApplicationId(applicationId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedApplicationId(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="bg-info/10 text-info border-info/20">Pending</Badge>;
      case "review":
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">In Review</Badge>;
      case "approved":
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20">Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "flagged":
        return <Badge variant="secondary" className="bg-destructive/10 text-destructive border-destructive/20">Flagged</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-info" />;
      case "flagged":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case "approved":
        return <CheckCircle className="h-4 w-4 text-success" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Recent Applications
            <Button variant="outline" size="sm">
              View All
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
                  {getStatusIcon(app.status)}
                  <div>
                    <h4 className="font-medium text-foreground">{app.businessName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {app.registrationNumber} • {app.submittedDate}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Monthly Turnover: {app.monthlyTurnover}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(app.status)}
                  {getRiskBadge(app.riskLevel)}
                  <Button variant="ghost" size="sm" onClick={() => handleReviewClick(app.id)}>
                    <Eye className="h-4 w-4" />
                    Review
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
        />
      )}
    </div>
  );
};