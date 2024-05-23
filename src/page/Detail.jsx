import { useState } from "react";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";

const YEAR_MONTH_DATE_REGIX = /^\d{4}-\d{2}-\d{2}$/;
const MAX_LENGTH_TITLE = "15";
const MAX_LENGTH_DESC = "20";

function Detail({ logMap, setLogFunc, deleteLogFunc }) {
  const navigate = useNavigate();
  const params = useParams();
  const logObj = logMap.get(params.id);

  const [logDate, setLogdate] = useState(logObj?.date);
  const [logTitle, setLogTitle] = useState(logObj?.title);
  const [logAmount, setLogAmount] = useState(logObj?.amount);
  const [logDescription, setLogDescription] = useState(logObj?.description);

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
    setLogFunc({
      id: params.id,
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
  const onClickDelete = () => {
    if (confirm("정말로 이 지출 항목을 삭제하시겠습니까?")) {
      deleteLogFunc(params.id);
    }
  };
  const onClickGoToPrev = () => {
    navigate(-1); // 바로 이전 페이지로 이동, '/main' 등 직접 지정도 당연히 가능
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
    <>
      {!logObj ? (
        <h1>삭제된 지출기록입니다.</h1>
      ) : (
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
          <button type="submit">수정</button>
          <button type="button" onClick={onClickDelete}>
            삭제
          </button>
          <Link type="button" onClick={onClickGoToPrev}>
            뒤로가기
          </Link>
        </form>
      )}
    </>
  );
}

export default Detail;
