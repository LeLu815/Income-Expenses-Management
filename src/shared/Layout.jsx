import Footer from "../components/Footer";
import Header from "../components/Header";

import styled from "styled-components";

const StBackgroundLayout = styled.div`
  background-color: rgb(45, 195, 183);
  width: 100vw;
  height: 100vh;
`;
const StOuterContainer = styled.div`
  max-width: 800px;
  min-width: 360px;
  box-sizing: border-box;
  margin: 30px auto;
`;

function Layout({ children }) {
  return (
    <StBackgroundLayout>
      <StOuterContainer>
        <Header />
        {children}
        <Footer />
      </StOuterContainer>
    </StBackgroundLayout>
  );
}

export default Layout;
