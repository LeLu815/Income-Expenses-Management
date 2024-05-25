import { useState } from "react";

import MonthGragh from "../../components/MonthGragh";
import MonthPostList from "../../components/MonthPostList";
import SelectMonth from "../../components/SelectMonth";
import SubmitForm from "../../components/SubmitForm";
import { MONTH_KEY } from "../../constant/constant";
import { getDataToLocal } from "../../util/storageFunc";

function Home() {
  const [selectedMonth, setSelectedMonth] = useState(getDataToLocal(MONTH_KEY));
  return (
    <>
      <SubmitForm selectedMonth={selectedMonth} />
      <SelectMonth
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      <MonthGragh selectedMonth={selectedMonth} />
      <MonthPostList selectedMonth={selectedMonth} />
    </>
  );
}

export default Home;
