import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, CheckCircle, Calendar, User } from "lucide-react";
import { useState } from "react";
import { ApplicationDetailModal } from "./ApplicationDetailModal";

interface Application {
  id: string;
  businessName: string;
  registrationNumber: string;
  applicationType: string;
  status: "approved";
  submittedDate: string;
  approvedDate: string;
  approvedBy: string;
  monthlyTurnover: string;
  riskLevel: "low" | "medium" | "high";
}

export const ApprovedApplications = () => {
  const [applications] = useState<Application[]>([
    {
      id: "APP-004",
      businessName: "Eldoret Manufacturing Ltd",
      registrationNumber: "PVT-202301459",
      applicationType: "SME Current Account",
      status: "approved",
      submittedDate: "2024-01-12",
      approvedDate: "2024-01-15",
      approvedBy: "John Doe",
      monthlyTurnover: "KES 4,500,000",
      riskLevel: "low",
    },
    {
      id: "APP-005",
      businessName: "Nakuru Logistics Solutions",
      registrationNumber: "PVT-202301460",
      applicationType: "SME Current Account",
      status: "approved",
      submittedDate: "2024-01-10",
      approvedDate: "2024-01-14",
      approvedBy: "Jane Smith",
      monthlyTurnover: "KES 3,200,000",
      riskLevel: "low",
    },
    {
      id: "APP-006",
      businessName: "Thika Industrial Services",
      registrationNumber: "PVT-202301461",
      applicationType: "SME Current Account",
      status: "approved",
      submittedDate: "2024-01-08",
      approvedDate: "2024-01-13",
      approvedBy: "Mike Johnson",
      monthlyTurnover: "KES 6,800,000",
      riskLevel: "medium",
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
          Approved Applications
        </h2>
        <p className="text-muted-foreground">
          View approved applications and their compliance history
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Approved Applications ({applications.length})
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
                  <CheckCircle className="h-4 w-4 text-success" />
                  <div>
                    <h4 className="font-medium text-foreground">{app.businessName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {app.registrationNumber} • Submitted: {app.submittedDate}
                    </p>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        Approved: {app.approvedDate}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <User className="h-3 w-3" />
                        By: {app.approvedBy}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Monthly Turnover: {app.monthlyTurnover}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                    Approved
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
          applicationStatus="approved"
        />
      )}
    </div>
  );
};
