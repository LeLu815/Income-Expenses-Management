import { createBrowserRouter } from "react-router-dom";

import { POST_ID } from "../constant/constant";
import DefaultLayout from "../layout/DefaultLayout";
import JoinPage from "../pages/Auth/JoinPage";
import LoginPage from "../pages/Auth/LoginPage";
import Detail, { loader as detailLoader } from "../pages/Detail";
import Home from "../pages/Home";
import NotFound from "../pages/NotFount/NotFound";
import PatchUserData from "../pages/User/PatchUserData.jsx/PatchUserData";
import PrivateRouterLayout, { privateLoader } from "./PrivateRouterLayout";
import PublicRouterLayout, { publicLoader } from "./PublicRouterLayout";

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        element: <PublicRouterLayout />,
        loader: publicLoader,
        children: [
          { path: "/login", element: <LoginPage /> },
          { path: "/join", element: <JoinPage /> },
        ],
      },
      {
        element: <PrivateRouterLayout />,
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
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
