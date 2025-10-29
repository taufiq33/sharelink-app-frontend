import { createBrowserRouter } from "react-router-dom";

import Playground from "@/pages/playground";

const router = createBrowserRouter([
  {
    path: "/playground",
    element: <Playground />,
  },
]);

export default router;
