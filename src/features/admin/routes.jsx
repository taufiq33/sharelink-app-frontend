import AdminDashboard from "@/pages/admin";
import UsersPage from "./pages/UsersPage";
import LinksPage from "./pages/LinksPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";

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
    path: "settings",
    element: <SettingsPage />,
  },
];
