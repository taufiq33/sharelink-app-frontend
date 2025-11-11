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
import ProtectedRoute from "./ProtectedRoute";

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
        ],
      },
    ],
  },
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
