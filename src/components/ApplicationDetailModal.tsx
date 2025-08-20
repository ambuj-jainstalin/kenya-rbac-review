import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, Flag, MessageSquare, FileText, Shield, AlertTriangle, Download } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { ComplianceChecks } from "./ComplianceChecks";
import { DeviationManagement } from "./DeviationManagement";

interface ApplicationDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicationId: string;
}

export const ApplicationDetailModal = ({ isOpen, onClose, applicationId }: ApplicationDetailModalProps) => {
  const [reviewComments, setReviewComments] = useState("");

  // Sample application data
  const application = {
    id: applicationId,
    businessName: "Nairobi Tech Solutions Ltd",
    tradingName: "NTS Digital",
    registrationNumber: "PVT-202301456",
    incorporationDate: "2020-03-15",
    natureOfBusiness: "Information Technology Services",
    numberOfEmployees: "15-25",
    monthlyTurnover: "KES 2,500,000",
    physicalAddress: {
      line1: "Westlands Commercial Centre, 2nd Floor",
      line2: "Waiyaki Way",
      city: "Nairobi",
      postalCode: "00100"
    },
    postalAddress: "P.O. Box 12345-00100, Nairobi",
    contactPerson: "John Kamau",
    phoneNumber: "+254 700 123456",
    email: "john.kamau@ntsdigital.co.ke",
    status: "pending",
    riskLevel: "low",
    submittedDate: "2024-01-15",
    documents: [
      "Certificate of Incorporation",
      "KRA PIN Certificate",
      "Business Permit",
      "Audited Financial Statements"
    ]
  };

  const handleApprove = () => {
    console.log("Approving application:", applicationId, "Comments:", reviewComments);
    onClose();
  };

  const handleReject = () => {
    console.log("Rejecting application:", applicationId, "Comments:", reviewComments);
    onClose();
  };

  const handleFlag = () => {
    console.log("Flagging application:", applicationId, "Comments:", reviewComments);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Application Review - {application.id}</span>
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-info/10 text-info border-info/20">
                {application.status}
              </Badge>
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                {application.riskLevel} risk
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Tabs defaultValue="application" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="application" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Application
              </TabsTrigger>
              <TabsTrigger value="compliance" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Compliance
              </TabsTrigger>
              <TabsTrigger value="deviations" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Deviations
              </TabsTrigger>
              <TabsTrigger value="review" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Review
              </TabsTrigger>
            </TabsList>

            <TabsContent value="application" className="space-y-6 mt-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Business Legal Name</label>
                    <p className="text-foreground">{application.businessName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Trading Name</label>
                    <p className="text-foreground">{application.tradingName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Registration Number</label>
                    <p className="text-foreground">{application.registrationNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Date of Incorporation</label>
                    <p className="text-foreground">{application.incorporationDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Nature of Business</label>
                    <p className="text-foreground">{application.natureOfBusiness}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Number of Employees</label>
                    <p className="text-foreground">{application.numberOfEmployees}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-muted-foreground">Expected Monthly Turnover</label>
                    <p className="text-foreground font-semibold">{application.monthlyTurnover}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Address Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Business Addresses</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Physical Address</label>
                    <p className="text-foreground">
                      {application.physicalAddress.line1}<br />
                      {application.physicalAddress.line2}<br />
                      {application.physicalAddress.city} {application.physicalAddress.postalCode}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Postal Address</label>
                    <p className="text-foreground">{application.postalAddress}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Contact Person</label>
                    <p className="text-foreground">{application.contactPerson}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                    <p className="text-foreground">{application.phoneNumber}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                    <p className="text-foreground">{application.email}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Documents */}
              <Card>
                <CardHeader>
                  <CardTitle>Submitted Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {application.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span className="text-sm font-medium">{doc}</span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            console.log(`Downloading ${doc}`);
                            // In a real app, this would trigger file download
                          }}
                          className="h-8 px-3"
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="compliance" className="mt-6">
              <ComplianceChecks />
            </TabsContent>

            <TabsContent value="deviations" className="mt-6">
              <DeviationManagement />
            </TabsContent>

            <TabsContent value="review" className="space-y-6 mt-6">
              {/* Review Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Review</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Review Comments</label>
                    <Textarea
                      placeholder="Enter your review comments and compliance notes..."
                      value={reviewComments}
                      onChange={(e) => setReviewComments(e.target.value)}
                      className="mt-2"
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <Separator />

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="secondary" onClick={handleFlag} className="bg-warning/10 text-warning border-warning/20 hover:bg-warning/20">
            <Flag className="h-4 w-4 mr-2" />
            Flag for Review
          </Button>
          <Button variant="destructive" onClick={handleReject}>
            <XCircle className="h-4 w-4 mr-2" />
            Reject
          </Button>
          <Button onClick={handleApprove} className="bg-success hover:bg-success-hover text-success-foreground">
            <CheckCircle className="h-4 w-4 mr-2" />
            Approve
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};