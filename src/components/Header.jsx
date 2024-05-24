import { Link } from "react-router-dom";
import styled from "styled-components";

const StHeader = styled.div`
  position: fixed;
  height: 60px;
  width: 100%;
`;
const StLogo = styled.img``;
function Header() {
  return (
    <StHeader>
      <Link to="/">
        <StLogo src="https://nbcamp.spartacodingclub.kr/_next/static/media/newLogo.a1d35235.svg" />
      </Link>
    </StHeader>
  );
}

export default Header;
