import { createBrowserRouter } from "react-router-dom";

import DefaultLayout from "../layout/DefaultLayout";
import Detail from "../pages/Detail";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/expense/:postId", element: <Detail /> },
    ],
  },
]);

export default router;
