import { createBrowserRouter } from "react-router-dom";

import Playground from "@/pages/playground";
import Rhf from "@/pages/playground/Rhf";
import RegisterTest from "@/pages/playground/RegisterTest";

const router = createBrowserRouter([
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
