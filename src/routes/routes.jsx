import { Outlet, createBrowserRouter, redirect } from "react-router-dom";

import api from "../api/api";
import { POST_ID } from "../constant/constant";
import DefaultLayout from "../layout/DefaultLayout";
import JoinPage from "../pages/Auth/JoinPage";
import LoginPage from "../pages/Auth/LoginPage";
import Detail from "../pages/Detail";
import Home from "../pages/Home";
import { getDataToSession } from "../util/storageFunc";

const AuthPrivateRouter = () => {
  return <Outlet />;
};
const privateLoader = async () => {
  const accessToken = getDataToSession("accessToken");
  try {
    return await api.auth.getUserInfo(accessToken);
  } catch (error) {
    return redirect("/login");
  }
};

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/join", element: <JoinPage /> },
      {
        element: <AuthPrivateRouter />,
        loader: privateLoader,
        children: [
          { path: "/", element: <Home /> },
          { path: `/expense/:${POST_ID}`, element: <Detail /> },
        ],
      },
    ],
  },
]);

export default router;
