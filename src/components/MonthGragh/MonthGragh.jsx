import { StGraphContainer, StGraphPortion } from "../../styles/ graphLayout";
import { StCardStyleDiv } from "../../styles/cardLayout";
import { graphPercent, priceToKor } from "../../util/calculation";

function MonthGragh({
  selectedMonth,
  selectedMonthPosts,
  selectedMonthPostObj,
  totalAmount,
}) {
  return (
    <StCardStyleDiv>
      <h1>{`${parseInt(selectedMonth) + 1}월 총 지출 : ${totalAmount}`}</h1>
      <StGraphContainer>
        {Object.keys(selectedMonthPostObj).map((key) => (
          <StGraphPortion
            key={key}
            $percent={graphPercent(
              totalAmount,
              selectedMonthPostObj[key].price
            )}
          />
        ))}
      </StGraphContainer>
      <div>
        {Object.keys(selectedMonthPostObj).map((key) => (
          <div key={key}>
            <span>컬러칩 </span>
            <span>{`${key}:`}</span>
            <span>{priceToKor(selectedMonthPostObj[key])}</span>
            <span>{`${graphPercent(
              totalAmount,
              selectedMonthPostObj[key]
            )}%`}</span>
          </div>
        ))}
      </div>
    </StCardStyleDiv>
  );
}

export default MonthGragh;
