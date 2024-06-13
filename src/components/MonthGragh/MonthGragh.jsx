import styled from "styled-components";

import {
  StGraphContainer,
  StGraphPortion,
  colorChipList,
} from "../../styles/ graphLayout";
import { StCardStyleDiv } from "../../styles/cardLayout";
import { graphPercent, priceToKor } from "../../util/calculation";

function MonthGragh({
  selectedMonth,
  selectedMonthPosts,
  selectedMonthPostObj,
  totalAmount,
}) {
  console.log("selectedMonthPostObj :", selectedMonthPostObj, totalAmount);
  return (
    <StCardStyleDiv>
      <StTitle>{`${
        parseInt(selectedMonth) + 1
      }월 총 지출 : ${totalAmount}`}</StTitle>
      <StGraphContainer>
        {Object.keys(selectedMonthPostObj).map((key, index) => (
          <StGraphPortion
            key={key}
            $colorChip={colorChipList[index]}
            $percent={graphPercent(totalAmount, selectedMonthPostObj[key])}
          />
        ))}
      </StGraphContainer>
      <StLegendContainer>
        {Object.keys(selectedMonthPostObj).map((key, index) => (
          <StLegend key={key}>
            <StColorChip $colorChip={colorChipList[index]} />
            <span>{`${key}:`}</span>
            <span>{priceToKor(selectedMonthPostObj[key])}</span>
            <span>{`${graphPercent(
              totalAmount,
              selectedMonthPostObj[key]
            )}%`}</span>
          </StLegend>
        ))}
      </StLegendContainer>
    </StCardStyleDiv>
  );
}

export default MonthGragh;

const StTitle = styled.h1`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`;

const StLegendContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 10px;
`;
const StLegend = styled.div`
  display: flex;
  align-items: center;

  span {
    font-size: 14px;
    color: rgb(85, 85, 85);
    font-weight: 600;
    margin-right: 8px;
  }
`;
const StColorChip = styled.div`
  width: 20px;
  height: 10px;
  background-color: ${(props) => props.$colorChip};
  margin-right: 8px;
`;
