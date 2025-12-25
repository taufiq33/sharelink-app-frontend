import { AppSidebar } from "../dashboard/AppSidebar";
import DashboardHeader from "../dashboard/DashboardHeader";
import { SidebarProvider } from "../ui/sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "../ui/sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSelector } from "react-redux";

export default function DashboardLayout() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const isAdmin = useSelector((state) => state.auth.role) === "admin";

  if (isAdmin) return navigate("/admin");
  return (
    <div className="bg-foreground/2">
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <DashboardHeader />
          <div className="p-4">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
      <Toaster
        richColors
        position={`${isMobile ? "top-center" : "bottom-right"}`}
      />
    </div>
  );
}
