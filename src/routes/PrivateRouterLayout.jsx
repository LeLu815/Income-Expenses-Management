import { Outlet, redirect } from "react-router";
import api from "../api/api";
import NavBar from "../components/NavBar";
import { ACCESS_TOKEN, USER_ID } from "../util/constant";
import { getDataToSession, setDataToSession } from "../util/storageFunc";

const PrivateRouterLayout = () => {
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
    setDataToSession(USER_ID, data.data.id);
    return null;
  } catch (error) {
    api.auth.logout();
    return redirect("/login");
  }
};

export default PrivateRouterLayout;
