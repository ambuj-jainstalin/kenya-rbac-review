import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardStats } from "@/components/DashboardStats";
import { ApplicationsList } from "@/components/ApplicationsList";
import { Sidebar } from "@/components/Sidebar";
import { PendingApplications } from "@/components/PendingApplications";
import { ApprovedApplications } from "@/components/ApprovedApplications";
import { RejectedApplications } from "@/components/RejectedApplications";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="space-y-6">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                SME Account Applications Review
              </h2>
              <p className="text-muted-foreground">
                Monitor and review small and medium enterprise account applications for compliance
              </p>
            </div>
            
            <DashboardStats />
            <ApplicationsList />
          </div>
        );
      case "pending":
        return <PendingApplications />;
      case "approved":
        return <ApprovedApplications />;
      case "rejected":
        return <RejectedApplications />;
      default:
        return <ApplicationsList />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="p-6 flex-1">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;