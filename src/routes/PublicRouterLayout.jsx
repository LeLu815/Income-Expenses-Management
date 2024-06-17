import { Outlet, redirect } from "react-router";
import api from "../api/api";
import { ACCESS_TOKEN } from "../util/constant";
import { getDataToSession } from "../util/storageFunc";

function PublicRouterLayout() {
  return <Outlet />;
}
export const publicLoader = async () => {
  let accesToken;
  try {
    accesToken = getDataToSession(ACCESS_TOKEN);
  } catch (e) {
    return null;
  }
  if (accesToken) {
    try {
      api.auth.updateToken(accesToken);
      const data = await api.auth.getUserInfo();
      return redirect("/");
    } catch (error) {
      return null;
    }
  }
  return null;
};

export default PublicRouterLayout;
