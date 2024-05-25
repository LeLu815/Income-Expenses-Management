import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";

import { LogContext, SetLogContext } from "./context/LogContext";
import router from "./routes/routes";
import GlobalStyles from "./styles/globalStyles";
import { setDataToLocal } from "./util/storageFunc";

import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const newSelectedMonth = new Date().getMonth();
    setDataToLocal("selectedMonth", newSelectedMonth);
  }, []);
  return (
    <>
      <GlobalStyles />
      <LogContext.Provider value={posts}>
        <SetLogContext.Provider value={setPosts}>
          <RouterProvider router={router} />
        </SetLogContext.Provider>
      </LogContext.Provider>
    </>
  );
}

export default App;
