import { createBrowserRouter } from "react-router-dom";

import Playground from "@/pages/playground";
import Rhf from "@/pages/playground/Rhf";
import RegisterTest from "@/pages/playground/RegisterTest";

import Homepage from "@/pages/public/Homepage";

const router = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  {
    path: "/playground",
    element: <Playground />,
  },
  {
    path: "/playground/rhf",
    element: <Rhf />,
  },
  {
    path: "/playground/register",
    element: <RegisterTest />,
  },
]);

export default router;
