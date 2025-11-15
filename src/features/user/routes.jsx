import ChangePasswordPage from "./pages/ChangePasswordPage";
import ProfileSettingsPage from "./pages/ProfileSettingsPage";
import SessionManagementPage from "./pages/SessionManagementPage";

export const userSettingsRoute = [
  {
    path: "profile",
    element: <ProfileSettingsPage />,
  },
  {
    path: "password",
    element: <ChangePasswordPage />,
  },
  {
    path: "session",
    element: <SessionManagementPage />,
  },
];
