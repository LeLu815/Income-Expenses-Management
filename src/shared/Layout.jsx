import styled from "styled-components";

const StBackgroundLayout = styled.div`
  background-color: rgb(45, 195, 183);
  width: 100dvw;
  height: 100dvh;
`;

function Layout({ children }) {
  return <StBackgroundLayout>{children}</StBackgroundLayout>;
}

export default Layout;
