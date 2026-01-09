import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import AdminDashboardChart from "@/features/admin/components/AdminDashboardChart";
import { Flag } from "lucide-react";
import { Link2 } from "lucide-react";
import { Users } from "lucide-react";
import { useSelector } from "react-redux";

function StatsCardItem({ label, value, icon, className }) {
  return (
    <div className="stats-card bg-card shadow rounded-lg p-3 flex-1/3 flex justify-between px-5 items-center">
      <div className="stats-card-label flex-2/3">
        <span className="text-muted-foreground text-sm">{label}</span>
        <h3 className="font-bold text-2xl">{value}</h3>
      </div>
      <Button size="icon" className={`${className} `}>
        {icon}
      </Button>
    </div>
  );
}

export default function AdminDashboard() {
  const { username } = useSelector((state) => state.auth);
  return (
    <div className="flex flex-col gap-4 p-2">
      <div>
        <h2 className="text-2xl font-bold">Hello, {username}!</h2>
        <p className="text-muted-foreground text-sm">
          Welcome back, {username}! Here's what's happening.
        </p>
      </div>
      <div className="container-stats-card flex gap-8 justify-center items-center">
        <StatsCardItem
          className="bg-accent"
          label="Total Users"
          value={248}
          icon={<Users />}
        />
        <StatsCardItem
          className={"bg-green-800"}
          label="Total Links"
          value={1248}
          icon={<Link2 />}
        />
        <StatsCardItem
          className={"bg-destructive"}
          label="Total Reports"
          value={122}
          icon={<Flag />}
        />
      </div>

      <div className="banner flex gap-2">
        <AdminDashboardChart />
        <div className="recent-report">
          <h3>Recent Reports</h3>
        </div>
      </div>
    </div>
  );
}
