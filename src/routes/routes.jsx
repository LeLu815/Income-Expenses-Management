import { createBrowserRouter } from "react-router-dom";

import { POST_ID } from "../constant/constant";
import DefaultLayout from "../layout/DefaultLayout";
import Detail from "../pages/Detail";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: `/expense/:${POST_ID}`, element: <Detail /> },
    ],
  },
]);

export default router;
