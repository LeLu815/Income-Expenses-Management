import AccountLogMonthlyStatus from "../components/AccountLogMonthlyStatus";
import SumbmitForm from "../components/SumbmitForm";

function Home({ logMap, submitLogForm }) {
  return (
    <>
      <SumbmitForm submitLogForm={submitLogForm} />
      <AccountLogMonthlyStatus logMap={logMap} />
    </>
  );
}

export default Home;
