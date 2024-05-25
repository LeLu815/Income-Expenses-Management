import { useContext } from "react";

import { LogContext } from "../../context/LogContext";

function MonthGragh({ selectedMonth }) {
  const posts = useContext(LogContext);
  return <div>MonthGragh</div>;
}

export default MonthGragh;
