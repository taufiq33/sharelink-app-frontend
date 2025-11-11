import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

export const authRouter = [
  {
    path: "",
    element: <LoginPage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
];
