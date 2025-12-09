import { AppSidebar } from "../dashboard/AppSidebar";
import DashboardHeader from "../dashboard/DashboardHeader";
import { SidebarProvider } from "../ui/sidebar";
import { Outlet } from "react-router-dom";
import { Toaster } from "../ui/sonner";

export default function DashboardLayout() {
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
      <Toaster />
    </div>
  );
}
