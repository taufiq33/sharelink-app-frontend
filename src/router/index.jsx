import { createBrowserRouter } from "react-router-dom";

// import Playground from "@/pages/playground";
// import Rhf from "@/pages/playground/Rhf";
// import RegisterTest from "@/pages/playground/RegisterTest";

import Homepage from "@/pages/public/Homepage";
import Dashboard from "@/pages/dashboard";
import PublicLayout from "@/components/layout/PublicLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AuthLayout from "@/components/layout/AuthLayout";
import { authRouter } from "@/features/auth/routes";
import { userSettingsRoute } from "@/features/user/routes";
import linksDashboardRoute from "@/features/links/routes";
import notificationsRoute from "@/features/notification/routes";
import { adminRoute } from "@/features/admin/routes";
import ProtectedRoute from "./ProtectedRoute";
import LinksByUsername from "@/pages/public/LinksByUsername";
import AdminLayout from "@/components/layout/AdminLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
    ],
  },

  {
    path: "/u/:username",
    element: <LinksByUsername />,
  },

  {
    path: "/auth",
    element: <AuthLayout />,
    children: authRouter,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute />,

    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "settings",
            children: userSettingsRoute,
          },
          {
            path: "links",
            children: linksDashboardRoute,
          },
          {
            path: "notifications",
            children: notificationsRoute,
          },
        ],
      },
    ],
  },
  {
    path: "/admin",
    element: <ProtectedRoute admin={true} />,

    children: [
      {
        element: <AdminLayout />,
        children: adminRoute,
      },
    ],
  },

  //TODO add error page
  { path: "*", element: <p>Page not found.</p> },
  // {
  //   path: "/playground",
  //   element: <Playground />,
  // },
  // {
  //   path: "/playground/rhf",
  //   element: <Rhf />,
  // },
  // {
  //   path: "/playground/register",
  //   element: <RegisterTest />,
  // },
]);

export default router;
