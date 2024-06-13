import styled from "styled-components";

export const StCardStyleDiv = styled.div`
  background-color: rgb(255, 255, 255);
  border-radius: 16px;
  padding: 20px;
  a {
    text-decoration: none;
  }
`;
export const StCardStyleDivPost = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-radius: 8px;
  background-color: rgb(249, 249, 249);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px;
  transition: transform 0.2s ease-in-out 0s;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
  }
`;
export const StCardStyleDivSmall = styled.div`
  text-align: center;
  font-family: Pretendard, serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  display: flex;
  height: 60px;
  padding: 20px;
  width: 104px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  color: var(--black-alpha-100, #000);
  border-radius: 10px;
  border: none;
  cursor: pointer;
  background: var(--black-alpha-100, #f6f7fa);
  box-sizing: border-box;
  background-color: ${(props) => (props.$isSelected ? "#2dc3b7" : "#f6f7fa")};
  color: ${(props) => (props.$isSelected ? "white" : "black")};

  &:hover {
    background-color: #2dc3b7;
    color: white;
  }
`;
