import { Outlet, redirect } from "react-router";
import api from "../api/api";
import NavBar from "../components/NavBar";
import { ACCESS_TOKEN } from "../util/constant";
import { getDataToSession } from "../util/storageFunc";

const AuthPrivateRouter = () => {
  return (
    <>
      <NavBar />
      <div className="h-20"></div>
      <Outlet />
    </>
  );
};
export const privateLoader = async () => {
  let accesToken;
  try {
    accesToken = getDataToSession(ACCESS_TOKEN);
  } catch (e) {
    return redirect("/login");
  }
  try {
    api.auth.updateToken(accesToken);
    const data = await api.auth.getUserInfo();
    return null;
  } catch (error) {
    return redirect("/login");
  }
};

export default AuthPrivateRouter;
