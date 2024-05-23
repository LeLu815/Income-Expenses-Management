import { useEffect, useState } from "react";

import AccountLogGraph from "../components/AccountLogGraph";
import AccountLogList from "../components/AccountLogList";
import MonthSelect from "../components/MonthSelect";
import SumbmitForm from "../components/SumbmitForm";

function Home({ logMap, submitLogForm }) {
  const [selectedMonth, setSelectedMonth] = useState("");

  // 배열로 추출
  const selectedMonthGraphObj = {};
  let totalAmout = 0;
  const logValues = Array.from(logMap.values());
  const seletedMonthLogList = logValues.filter((logObj) => {
    if (new Date(logObj.date).getMonth() === parseInt(selectedMonth)) {
      if (selectedMonthGraphObj[logObj.title]) {
        selectedMonthGraphObj[logObj.title] =
          parseInt(selectedMonthGraphObj[logObj.title]) +
          parseInt(logObj.amount);
      } else {
        selectedMonthGraphObj[logObj.title] = logObj.amount;
      }
      totalAmout += parseInt(logObj.amount);
      return true;
    }
    return false;
  });
  useEffect(() => {
    const prevSelectedMonth = window.localStorage.getItem("selectedMonth");
    console.log(prevSelectedMonth);
    if (prevSelectedMonth) {
      setSelectedMonth(prevSelectedMonth);
    } else {
      const newDate = new Date().getMonth();
      window.localStorage.setItem("selectedMonth", newDate);
      setSelectedMonth(newDate);
    }
  }, []);

  return (
    <>
      <SumbmitForm submitLogForm={submitLogForm} />
      <MonthSelect
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      <AccountLogGraph
        selectedMonthGraphObj={selectedMonthGraphObj}
        selectedMonth={selectedMonth}
        totalAmout={totalAmout}
      />
      <AccountLogList seletedMonthLogList={seletedMonthLogList} />
    </>
  );
}

export default Home;
