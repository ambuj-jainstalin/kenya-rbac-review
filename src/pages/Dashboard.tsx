import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardStats } from "@/components/DashboardStats";
import { ApplicationsList } from "@/components/ApplicationsList";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
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
      </main>
    </div>
  );
};

export default Dashboard;