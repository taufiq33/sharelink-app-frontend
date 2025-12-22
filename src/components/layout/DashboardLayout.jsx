import { AppSidebar } from "../dashboard/AppSidebar";
import DashboardHeader from "../dashboard/DashboardHeader";
import { SidebarProvider } from "../ui/sidebar";
import { Outlet } from "react-router-dom";
import { Toaster } from "../ui/sonner";
import { useIsMobile } from "@/hooks/use-mobile";

export default function DashboardLayout() {
  const isMobile = useIsMobile();
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
