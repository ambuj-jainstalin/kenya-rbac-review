import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Plus, User, Calendar, Upload, FileText, Download } from "lucide-react";
import { useState } from "react";

interface Deviation {
  id: string;
  type: "kyc" | "aml" | "pep" | "regulatory";
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  status: "open" | "approved" | "rejected" | "under_review";
  raisedBy: string;
  raisedDate: string;
  approvedBy?: string;
  approvalDate?: string;
  justification?: string;
  documents?: string[];
}

interface DeviationManagementProps {
  applicationId?: string;
  applicationStatus?: "pending" | "review" | "approved" | "rejected" | "flagged";
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

const getRandomStatus = (seed: number, applicationStatus: string) => {
  const random = (seed * 9301 + 49297) % 233280;
  const normalized = random / 233280;
  
  // For approved applications, deviations should be closed (approved or rejected only)
  if (applicationStatus === "approved") {
    if (normalized < 0.8) return "approved";
    return "rejected";
  }
  
  // For rejected applications, deviations should be mostly rejected or open
  if (applicationStatus === "rejected") {
    if (normalized < 0.6) return "rejected";
    if (normalized < 0.8) return "open";
    return "under_review";
  }
  
  // For other application statuses
  if (normalized < 0.3) return "approved";
  if (normalized < 0.6) return "under_review";
  if (normalized < 0.8) return "open";
  return "rejected";
};

const generateRandomDeviations = (applicationId: string, applicationStatus: string): Deviation[] => {
  const baseSeed = generateSeededRandom(applicationId);
  const deviationOptions = [
    {
      type: "kyc" as const,
      description: "Tax returns for last 2 years not available - client provided explanation letter",
      justification: "Client is a new business entity, established 18 months ago. Provided interim financial statements and accountant's letter confirming tax compliance.",
      severity: "medium" as const
    },
    {
      type: "kyc" as const,
      description: "Address verification incomplete - utility bill address differs from registered address",
      justification: "Client provided valid explanation for address discrepancy. New premises under renovation, temporary address provided.",
      severity: "low" as const
    },
    {
      type: "aml" as const,
      description: "High-value transaction patterns detected requiring enhanced monitoring",
      justification: "Client operates in import-export business with legitimate high-value transactions. Enhanced due diligence completed.",
      severity: "medium" as const
    },
    {
      type: "pep" as const,
      description: "Contact person has previous government employment history",
      justification: "Former government employee in non-sensitive position. No current political exposure identified.",
      severity: "low" as const
    },
    {
      type: "regulatory" as const,
      description: "Industry-specific compliance concerns - technology services with crypto exposure",
      justification: "Client provides blockchain consulting services. Enhanced monitoring and reporting requirements implemented.",
      severity: "high" as const
    },
    {
      type: "kyc" as const,
      description: "Business registration certificate pending renewal",
      justification: "Renewal application submitted and payment confirmed. Certificate expected within 30 days.",
      severity: "low" as const
    }
  ];

  const random = (baseSeed * 9301 + 49297) % 233280;
  const normalized = random / 233280;
  
  // Generate 0-3 deviations based on application ID
  const numDeviations = Math.floor(normalized * 4);
  
  if (numDeviations === 0) return [];

  const selectedDeviations = [];
  for (let i = 0; i < numDeviations; i++) {
    const deviationSeed = baseSeed + i + 1;
    const deviationRandom = (deviationSeed * 9301 + 49297) % 233280;
    const deviationNormalized = deviationRandom / 233280;
    
    const selectedOption = deviationOptions[Math.floor(deviationNormalized * deviationOptions.length)];
    const status = getRandomStatus(deviationSeed, applicationStatus);
    
    const deviation: Deviation = {
      id: `DEV-${String(i + 1).padStart(3, '0')}`,
      type: selectedOption.type,
      severity: selectedOption.severity,
      description: selectedOption.description,
      status,
      raisedBy: "John Mwangi",
      raisedDate: "2024-01-15 11:45",
      justification: selectedOption.justification,
      ...(status === "approved" && {
        approvedBy: "Compliance Manager",
        approvalDate: "2024-01-15 14:30"
      }),
      ...(status === "rejected" && {
        approvedBy: "Compliance Manager",
        approvalDate: "2024-01-15 14:30"
      })
    };
    
    selectedDeviations.push(deviation);
  }
  
  return selectedDeviations;
};

export const DeviationManagement = ({ applicationId = "default", applicationStatus = "pending" }: DeviationManagementProps) => {
  const [deviations, setDeviations] = useState<Deviation[]>(() => generateRandomDeviations(applicationId, applicationStatus));

  const [newDeviation, setNewDeviation] = useState({
    type: "",
    severity: "",
    description: "",
    justification: "",
    documents: [] as string[]
  });

  const [showNewDeviationForm, setShowNewDeviationForm] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileNames = Array.from(files).map(file => file.name);
      setNewDeviation(prev => ({
        ...prev,
        documents: [...prev.documents, ...fileNames]
      }));
    }
  };

  const removeDocument = (index: number) => {
    setNewDeviation(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const handleAddDeviation = () => {
    if (newDeviation.type && newDeviation.severity && newDeviation.description) {
      const deviation: Deviation = {
        id: `DEV-${String(deviations.length + 2).padStart(3, '0')}`,
        type: newDeviation.type as any,
        severity: newDeviation.severity as any,
        description: newDeviation.description,
        status: "open",
        raisedBy: "Current User",
        raisedDate: new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }),
        justification: newDeviation.justification,
        documents: newDeviation.documents
      };

      setDeviations([...deviations, deviation]);
      setNewDeviation({ type: "", severity: "", description: "", justification: "", documents: [] });
      setShowNewDeviationForm(false);
    }
  };

  const handleApproveDeviation = (deviationId: string) => {
    setDeviations(deviations.map(dev => 
      dev.id === deviationId 
        ? { 
            ...dev, 
            status: "approved", 
            approvedBy: "Compliance Manager",
            approvalDate: new Date().toLocaleString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            })
          } 
        : dev
    ));
  };

  const handleRejectDeviation = (deviationId: string) => {
    setDeviations(deviations.map(dev => 
      dev.id === deviationId 
        ? { 
            ...dev, 
            status: "rejected", 
            approvedBy: "Compliance Manager",
            approvalDate: new Date().toLocaleString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            })
          } 
        : dev
    ));
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "low":
        return <Badge variant="secondary" className="bg-info/10 text-info border-info/20">Low</Badge>;
      case "medium":
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">Medium</Badge>;
      case "high":
        return <Badge variant="secondary" className="bg-destructive/10 text-destructive border-destructive/20">High</Badge>;
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      default:
        return <Badge variant="secondary">{severity}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">Open</Badge>;
      case "under_review":
        return <Badge variant="secondary" className="bg-info/10 text-info border-info/20">Under Review</Badge>;
      case "approved":
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20">Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    const typeMap = {
      kyc: "KYC",
      aml: "AML",
      pep: "PEP",
      regulatory: "Regulatory"
    };
    return <Badge variant="outline">{typeMap[type as keyof typeof typeMap] || type}</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Compliance Deviations
          </div>
          {applicationStatus !== "approved" && applicationStatus !== "rejected" && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowNewDeviationForm(!showNewDeviationForm)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Deviation
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* New Deviation Form */}
        {showNewDeviationForm && (
          <div className="p-4 border border-border rounded-lg bg-muted/20">
            <h4 className="font-medium mb-4">Raise New Deviation</h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Type</label>
                <Select value={newDeviation.type} onValueChange={(value) => setNewDeviation({...newDeviation, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select deviation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kyc">KYC</SelectItem>
                    <SelectItem value="aml">AML</SelectItem>
                    <SelectItem value="pep">PEP</SelectItem>
                    <SelectItem value="regulatory">Regulatory</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Severity</label>
                <Select value={newDeviation.severity} onValueChange={(value) => setNewDeviation({...newDeviation, severity: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mb-4">
              <label className="text-sm font-medium text-muted-foreground">Description</label>
              <Textarea
                placeholder="Describe the deviation..."
                value={newDeviation.description}
                onChange={(e) => setNewDeviation({...newDeviation, description: e.target.value})}
                className="mt-2"
              />
            </div>
            <div className="mb-4">
              <label className="text-sm font-medium text-muted-foreground">Justification</label>
              <Textarea
                placeholder="Provide justification for the deviation..."
                value={newDeviation.justification}
                onChange={(e) => setNewDeviation({...newDeviation, justification: e.target.value})}
                className="mt-2"
              />
            </div>
            
            {/* Document Upload Section */}
            <div className="mb-4">
              <label className="text-sm font-medium text-muted-foreground">Supporting Documents (Optional)</label>
              <div className="mt-2 space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center gap-2 px-3 py-2 border border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <Upload className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Upload documents</span>
                  </label>
                </div>
                
                {/* Display uploaded files */}
                {newDeviation.documents.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Uploaded files:</p>
                    {newDeviation.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted/20 rounded text-xs">
                        <div className="flex items-center gap-2">
                          <FileText className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{doc}</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeDocument(index)}
                          className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleAddDeviation}>Add Deviation</Button>
              <Button variant="outline" onClick={() => setShowNewDeviationForm(false)}>Cancel</Button>
            </div>
          </div>
        )}

        {/* Existing Deviations */}
        {deviations.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No compliance deviations raised</p>
          </div>
        ) : (
          <div className="space-y-4">
            {deviations.map((deviation) => (
              <div key={deviation.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{deviation.id}</span>
                    {getTypeBadge(deviation.type)}
                    {getSeverityBadge(deviation.severity)}
                    {getStatusBadge(deviation.status)}
                  </div>
                </div>
                
                <p className="text-foreground mb-3">{deviation.description}</p>
                
                {deviation.justification && (
                  <div className="mb-3">
                    <label className="text-sm font-medium text-muted-foreground">Justification:</label>
                    <p className="text-sm text-muted-foreground mt-1">{deviation.justification}</p>
                  </div>
                )}
                
                {deviation.documents && deviation.documents.length > 0 && (
                  <div className="mb-3">
                    <label className="text-sm font-medium text-muted-foreground">Supporting Documents:</label>
                    <div className="mt-1 space-y-1">
                      {deviation.documents.map((doc, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-muted/20 rounded text-xs">
                          <FileText className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{doc}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 ml-auto text-muted-foreground hover:text-foreground"
                            onClick={() => {
                              console.log(`Downloading ${doc}`);
                              // In a real app, this would trigger file download
                            }}
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    Raised by: {deviation.raisedBy}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {deviation.raisedDate}
                  </div>
                </div>
                
                {deviation.approvedBy && (
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {deviation.status === "approved" ? "Approved" : "Rejected"} by: {deviation.approvedBy}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {deviation.approvalDate}
                    </div>
                  </div>
                )}
                
                {(deviation.status === "open" || deviation.status === "under_review") && applicationStatus !== "approved" && applicationStatus !== "rejected" && (
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="bg-success/10 text-success border-success/20 hover:bg-success/20"
                      onClick={() => handleApproveDeviation(deviation.id)}
                    >
                      Approve Deviation
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20"
                      onClick={() => handleRejectDeviation(deviation.id)}
                    >
                      Reject Deviation
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
