import { Outlet } from "react-router";
import styled from "styled-components";

function DefaultLayout() {
  return (
    <StDefault>
      <StMain>
        <Outlet />
      </StMain>
    </StDefault>
  );
}

export default DefaultLayout;

const StDefault = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;
const StMain = styled.div`
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0px auto;
`;
