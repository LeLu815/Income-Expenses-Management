import { useContext, useState } from "react";

import MonthGragh from "../../components/MonthGragh";
import MonthPostList from "../../components/MonthPostList";
import SelectMonth from "../../components/SelectMonth";
import SubmitForm from "../../components/SubmitForm";
import { MONTH_KEY } from "../../constant/constant";
import { LogContext } from "../../context/LogContext";
import { getDataToSession } from "../../util/storageFunc";

function Home() {
  const [selectedMonth, setSelectedMonth] = useState(
    getDataToSession(MONTH_KEY)
  );
  // 어차피 selectedMonth가 새로 계산될때마다 배열을 필터링하여 계산해야하기 때문에 홈 컴포넌트에서 필터링하고 아래 내려주는 것이 효율적
  const posts = useContext(LogContext);
  let totalAmount = 0;
  const selectedMonthPostObj = {};
  const selectedMonthPosts = posts.filter((post) => {
    if (parseInt(selectedMonth) === parseInt(new Date(post.date).getMonth())) {
      totalAmount += parseInt(post.price);
      if (selectedMonthPostObj[post.category]) {
        selectedMonthPostObj[post.category] += parseInt(post.price);
      } else {
        selectedMonthPostObj[post.category] = parseInt(post.price);
      }
      return true;
    } else {
      return false;
    }
  });

  return (
    <>
      <SubmitForm isInHome={true} selectedMonth={selectedMonth} />
      <SelectMonth
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      <MonthGragh
        selectedMonth={selectedMonth}
        selectedMonthPosts={selectedMonthPosts}
        selectedMonthPostObj={selectedMonthPostObj}
        totalAmount={totalAmount}
      />
      <MonthPostList
        selectedMonth={selectedMonth}
        selectedMonthPosts={selectedMonthPosts}
      />
    </>
  );
}

export default Home;
