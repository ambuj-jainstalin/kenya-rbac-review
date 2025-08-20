import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Clock, CheckCircle, AlertTriangle } from "lucide-react";

export const DashboardStats = () => {
  const stats = [
    {
      title: "Pending Review",
      value: "24",
      change: "+12%",
      icon: Clock,
      variant: "info" as const,
    },
    {
      title: "Approved Today",
      value: "18",
      change: "+8%",
      icon: CheckCircle,
      variant: "success" as const,
    },
    {
      title: "Flagged for Review",
      value: "6",
      change: "+3%",
      icon: AlertTriangle,
      variant: "warning" as const,
    },
    {
      title: "Total Applications",
      value: "156",
      change: "+24%",
      icon: TrendingUp,
      variant: "primary" as const,
    },
  ];

  const getVariantStyles = (variant: string) => {
    switch (variant) {
      case "success":
        return "text-success";
      case "warning":
        return "text-warning";
      case "info":
        return "text-info";
      default:
        return "text-primary";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${getVariantStyles(stat.variant)}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">{stat.change}</span> from last week
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};