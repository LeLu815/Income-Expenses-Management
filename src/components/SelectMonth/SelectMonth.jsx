import { MONTH_KEY } from "../../constant/constant";
import { StCardStyleDiv, StCardStyleDivSmall } from "../../styles/cardLayout";
import { setDataToSession } from "../../util/storageFunc";

const monthList = new Array(12).fill();
function SelectMonth({ selectedMonth, setSelectedMonth }) {
  return (
    <StCardStyleDiv>
      {monthList.map((value, index) => (
        <StCardStyleDivSmall
          key={index}
          $isSelected={selectedMonth === index}
          onClick={() => {
            setSelectedMonth(index);
            setDataToSession(MONTH_KEY, index);
          }}
        >{`${parseInt(index) + 1}월`}</StCardStyleDivSmall>
      ))}
    </StCardStyleDiv>
  );
}

export default SelectMonth;
