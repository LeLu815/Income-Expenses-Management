import { createBrowserRouter } from "react-router-dom";

import { POST_ID } from "../constant/constant";
import DefaultLayout from "../layout/DefaultLayout";
import JoinPage from "../pages/Auth/JoinPage";
import LoginPage from "../pages/Auth/LoginPage";
import Detail, { loader as detailLoader } from "../pages/Detail";
import Home from "../pages/Home";
import PatchUserData from "../pages/User/PatchUserData.jsx/PatchUserData";
import AuthPrivateRouter, { privateLoader } from "./AuthPrivateRouter";
import PublicRouter, { publicLoader } from "./PublicRouter";

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        element: <PublicRouter />,
        loader: publicLoader,
        children: [
          { path: "/login", element: <LoginPage /> },
          { path: "/join", element: <JoinPage /> },
        ],
      },
      {
        element: <AuthPrivateRouter />,
        loader: privateLoader,
        children: [
          { path: "/", element: <Home /> },
          {
            path: `/expense/:${POST_ID}`,
            element: <Detail />,
            loader: detailLoader,
          },
          { path: "/user/info", element: <PatchUserData /> },
        ],
      },
    ],
  },
]);

export default router;
