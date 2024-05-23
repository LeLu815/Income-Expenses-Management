import { Link } from "react-router-dom";

function AccountLogList({ seletedMonthLogList }) {
  return (
    <div>
      {seletedMonthLogList.length !== 0 ? (
        seletedMonthLogList.map((log) => {
          return (
            <Link key={log.id} to={`/expenses/${log.id}`}>
              <div>
                <h3>{log.title}</h3>
                <h4>{log.date}</h4>
                <h4>{log.amount}</h4>
                <p>{log.description}</p>
              </div>
            </Link>
          );
        })
      ) : (
        <h1>지출이 없습니다.</h1>
      )}
    </div>
  );
}

export default AccountLogList;
