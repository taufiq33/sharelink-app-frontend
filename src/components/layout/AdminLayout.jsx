// import { AppSidebar } from "../dashboard/AppSidebar";
// import DashboardHeader from "../dashboard/DashboardHeader";
import { AdminSidebar } from "../admin/AdminSidebar";
import AdminHeader from "../admin/AdminHeader";
import { SidebarProvider } from "../ui/sidebar";
import { Outlet } from "react-router-dom";
import { Toaster } from "../ui/sonner";
import { useIsMobile } from "@/hooks/use-mobile";

export default function AdminLayout() {
  const isMobile = useIsMobile();
  return (
    <div className="bg-foreground/2">
      <SidebarProvider>
        {/* <AppSidebar /> */}
        <AdminSidebar />
        <main className="w-full">
          {/* <DashboardHeader /> */}
          <AdminHeader />
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
