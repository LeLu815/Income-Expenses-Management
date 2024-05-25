import { createBrowserRouter } from "react-router-dom";

import DefaultLayout from "../layout/DefaultLayout";

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [],
  },
]);

export default router;
