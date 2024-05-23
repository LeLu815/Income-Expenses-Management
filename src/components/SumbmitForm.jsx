import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const YEAR_MONTH_DATE_REGIX = /^\d{4}-\d{2}-\d{2}$/;
const MAX_LENGTH_TITLE = "15";
const MAX_LENGTH_DESC = "20";

function SumbmitForm({ submitLogForm }) {
  const [logDate, setLogdate] = useState("");
  const [logTitle, setLogTitle] = useState("");
  const [logAmount, setLogAmount] = useState("");
  const [logDescription, setLogDescription] = useState("");

  const onSubmitFunc = (e) => {
    e.preventDefault();
    if (!YEAR_MONTH_DATE_REGIX.test(logDate)) {
      setLogdate("");
      return alert("날짜 형식을 확인해주세요.");
    }
    if (!logTitle) {
      return alert("제목을 입력해주세요.");
    }
    if (!logAmount || logAmount === "0") {
      return alert("금액을 입력해주세요.");
    }
    if (!logDescription) {
      return alert("내용을 입력해주세요.");
    }
    submitLogForm({
      id: uuidv4(),
      date: logDate,
      title: logTitle,
      amount: logAmount,
      description: logDescription,
    });
    setLogdate("");
    setLogTitle("");
    setLogAmount("");
    setLogDescription("");
  };
  const handleChangeDate = (value) => {
    const valueLenth = value.length;
    if (valueLenth > 10) {
      return;
    }
    switch (valueLenth) {
      case 4:
        return setLogdate((prev) => {
          if (prev.length < valueLenth) {
            // 추가하는 상황
            setLogdate(`${value}-`);
          } else {
            setLogdate(value);
          }
        });
      case 7:
        return setLogdate((prev) => {
          if (prev.length < valueLenth) {
            // 추가하는 상황
            setLogdate(`${value}-`);
          } else {
            setLogdate(value);
          }
        });
    }
    return setLogdate(value);
  };
  const handleChangeTitle = (value) => {
    setLogTitle(value);
  };
  const handleChangeAmount = (value) => {
    setLogAmount(value);
  };
  const handleChangeDescription = (value) => {
    setLogDescription(value);
  };

  return (
    <form onSubmit={onSubmitFunc}>
      <input
        value={logDate}
        type="text"
        placeholder="YYYY-MM-DD"
        required
        onChange={(e) => {
          handleChangeDate(e.target.value);
        }}
      />
      <input
        type="text"
        value={logTitle}
        placeholder="지출 항목"
        maxLength={MAX_LENGTH_TITLE}
        required
        onChange={(e) => {
          handleChangeTitle(e.target.value);
        }}
      />
      <input
        type="number"
        value={logAmount}
        placeholder="지출 금액"
        required
        onChange={(e) => {
          handleChangeAmount(e.target.value);
        }}
      />
      <input
        type="text"
        value={logDescription}
        maxLength={MAX_LENGTH_DESC}
        placeholder="지출 내용"
        required
        onChange={(e) => {
          handleChangeDescription(e.target.value);
        }}
      />
      <button type="submit">저장</button>
    </form>
  );
}

export default SumbmitForm;
