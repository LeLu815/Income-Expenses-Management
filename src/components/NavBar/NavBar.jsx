import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

import api from "../../api/api";
import defaultImage from "../../assets/defaultImage.jpeg";
import { ACCESS_TOKEN, QUERY_USER } from "../../util/constant";
import { getDataToSession } from "../../util/storageFunc";

function NavBar() {
  const navigate = useNavigate();
  const {
    data: userData,
    isLoading: userDataLoading,
    isError: userDataError,
  } = useQuery({
    queryKey: [QUERY_USER],
    queryFn: () => {
      const accessToken = getDataToSession(ACCESS_TOKEN);
      api.auth.updateToken(accessToken);
      return api.auth.getUserInfo();
    },
  });
  const userImageUrl =
    userData && userData.data.avatar ? userData.data.avatar : defaultImage;

  const handleClicklogout = () => {
    api.auth.logout();
    return navigate("/login");
  };
  return (
    <div className="flex items-center justify-center fixed top-0 right-0 left-0 bg-zinc-800 px-8">
      <div className="py-3 flex justify-between text-white min-w-[800px] max-w-[1280px] w-full">
        <div className="flex gap-16 items-center ">
          <Link to="/">HOME</Link>
          <Link to="/user/info">내 프로필</Link>
        </div>
        <div className="flex gap-16 items-center ">
          <div className="flex gap-4 items-center ">
            <img
              className="w-16 h-16 rounded-full object-cover"
              src={userImageUrl}
              alt="유저 프로필 이미지"
            />
            <span>{userData && userData.data.nickname}</span>
          </div>
          <Button variant="contained" color="error" onClick={handleClicklogout}>
            로그아웃
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
