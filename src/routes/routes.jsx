import { createBrowserRouter } from "react-router-dom";

import { POST_ID } from "../constant/constant";
import DefaultLayout from "../layout/DefaultLayout";
import JoinPage from "../pages/Auth/JoinPage";
import LoginPage from "../pages/Auth/LoginPage";
import Detail from "../pages/Detail";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/join", element: <JoinPage /> },
      { path: "/", element: <Home /> },
      { path: `/expense/:${POST_ID}`, element: <Detail /> },
    ],
  },
]);

export default router;
