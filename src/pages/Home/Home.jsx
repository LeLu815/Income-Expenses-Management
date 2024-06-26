import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { todosApi } from "../../api/api";
import Loading from "../../components/Loading";
import MonthGragh from "../../components/MonthGragh";
import MonthPostList from "../../components/MonthPostList";
import SelectMonth from "../../components/SelectMonth";
import SubmitForm from "../../components/SubmitForm";
import { MONTH_KEY } from "../../constant/constant";
import { QUERY_POSTS } from "../../util/constant";
import {
  addMoreColor,
  getColorCount,
  getDataToSession,
} from "../../util/storageFunc";

function Home() {
  const [selectedMonth, setSelectedMonth] = useState(
    getDataToSession(MONTH_KEY)
  );
  const [selectedMonthPosts, setSelectedMonthPosts] = useState([]);
  const [selectedMonthPostObj, setSelectedMonthPostObj] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

  const {
    data,
    isLoading: postsLoading,
    isError: postsError,
  } = useQuery({
    queryKey: [QUERY_POSTS],
    queryFn: () => todosApi.todos.getTodos(),
  });

  let posts;

  useEffect(() => {
    if (data) {
      posts = data.data;
      let totalAmount = 0;
      const selectedMonthPostObj = {};
      setSelectedMonthPosts(
        posts.filter((post) => {
          if (
            parseInt(selectedMonth) === parseInt(new Date(post.date).getMonth())
          ) {
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
        })
      );
      setSelectedMonthPostObj(selectedMonthPostObj);
      const objLength = Object.keys(selectedMonthPostObj).length;
      const colorLength = getColorCount();
      if (objLength > colorLength) {
        addMoreColor(objLength);
      }
      setTotalAmount(totalAmount);
    }
  }, [data, selectedMonth]);

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
      {postsLoading && <Loading />}
    </>
  );
}

export default Home;
