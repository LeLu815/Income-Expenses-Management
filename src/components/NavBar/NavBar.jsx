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
    <div>
      <div>
        <Link to="/">홈</Link>
        <Link to="/user/info">내 프로필</Link>
      </div>
      <div>
        <div>
          <img src={userImageUrl} alt="유저 프로필 이미지" />
          <span>{userData && userData.data.nickname}</span>
        </div>
        <button onClick={handleClicklogout}>로그아웃</button>
      </div>
    </div>
  );
}

export default NavBar;
