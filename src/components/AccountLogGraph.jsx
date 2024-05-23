function AccountLogGraph({ selectedMonthGraphObj, totalAmout, selectedMonth }) {
  const keys = Object.keys(selectedMonthGraphObj);
  return (
    <div>
      <h1>
        {selectedMonth + 1}월 총 지출 : {totalAmout} 원
      </h1>
      {keys.map((key) => (
        <div key={key}>
          <h4>{key}</h4>
          <h5>{selectedMonthGraphObj[key]}</h5>
        </div>
      ))}
    </div>
  );
}

export default AccountLogGraph;
