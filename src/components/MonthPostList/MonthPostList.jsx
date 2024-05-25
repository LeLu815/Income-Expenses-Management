import { useContext } from "react";
import { LogContext } from "../../context/LogContext";

function MonthPostList({ selectedMonth }) {
  const posts = useContext(LogContext);
  return <div>MonthPostList</div>;
}

export default MonthPostList;
