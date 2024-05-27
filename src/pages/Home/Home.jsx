import { useState } from "react";
import { useSelector } from "react-redux";

import MonthGragh from "../../components/MonthGragh";
import MonthPostList from "../../components/MonthPostList";
import SelectMonth from "../../components/SelectMonth";
import SubmitForm from "../../components/SubmitForm";
import { MONTH_KEY } from "../../constant/constant";
import { getDataToSession } from "../../util/storageFunc";

function Home() {
  const posts = useSelector((state) => state.post);
  const [selectedMonth, setSelectedMonth] = useState(
    getDataToSession(MONTH_KEY)
  );
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
