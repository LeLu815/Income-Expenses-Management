function MonthSelect({ selectedMonth, setSelectedMonth }) {
  const handleMonthClick = (month) => {
    window.localStorage.setItem("selectedMonth", month);
    setSelectedMonth(month);
  };
  return (
    <div>
      {Array(12)
        .fill()
        .map((value, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                handleMonthClick(index);
              }}
            >
              {index + 1}월
            </div>
          );
        })}
    </div>
  );
}

export default MonthSelect;
