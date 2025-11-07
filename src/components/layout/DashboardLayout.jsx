import { AppSidebar } from "../dashboard/AppSidebar";
import DashboardHeader from "../dashboard/DashboardHeader";
import { SidebarProvider } from "../ui/sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="bg-stone-100">
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <DashboardHeader />
          <div className="p-4">{children}</div>
        </main>
      </SidebarProvider>
      {children}
    </div>
  );
}
