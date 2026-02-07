import AdminDashboard from "@/pages/admin";
import UsersPage from "./pages/UsersPage";
import LinksPage from "./pages/LinksPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import ReportDetailPage from "./pages/ReportDetailPage";

export const adminRoute = [
  {
    path: "",
    element: <AdminDashboard />,
  },
  {
    path: "users",
    element: <UsersPage />,
  },
  {
    path: "links",
    element: <LinksPage />,
  },
  {
    path: "reports",
    element: <ReportsPage />,
  },
  {
    path: "reports/:id",
    element: <ReportDetailPage />,
  },
  {
    path: "settings",
    element: <SettingsPage />,
  },
];
