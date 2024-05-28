import styled from "styled-components";
import { graphPercent } from "../util/calculation";

export const colorChipList = [
  "#845EC2",
  "#008F7A",
  "#D65DB1",
  "#0081CF",
  "#FF6F91",
  "#0089BA",
  "#FF8066",
  "#4B4453",
  "#FFC75F",
  "#00D2FC",
  "#F9F871",
];

export const StGraphContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  height: 40px;
  background-color: rgb(233, 236, 239);
  border-radius: 8px;
  overflow: hidden;
`;
export const StGraphPortion = styled.div`
  height: 100%;
  background-color: ${(props) => props.$colorChip};
  ${(props) => {
    const widthValue = graphPercent(props.$percent.total, props.$percent.price);
    return `width : ${widthValue}%;`;
  }}
  transition: width 0.2s ease-in-out 0s;
`;
