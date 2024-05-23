import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Detail from "./page/Detail";
import Home from "./page/Home";
import GlobalStyle from "./shared/GlobalStyle";
import Layout from "./shared/Layout";

function App() {
  const [accountBookLogMap, setAccountBookLogMap] = useState(new Map());
  const onSubmitNewLog = (newLog) => {
    setAccountBookLogMap((prevMap) => new Map(prevMap).set(newLog.id, newLog));
  };
  const onDeleteNewLog = (id) => {
    setAccountBookLogMap((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.delete(id);
      return newMap;
    });
  };

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <Home logMap={accountBookLogMap} submitLogForm={onSubmitNewLog} />
            }
          />
          <Route
            path="/expenses/:id"
            element={
              <Detail
                logMap={accountBookLogMap}
                setLogFunc={onSubmitNewLog}
                deleteLogFunc={onDeleteNewLog}
              />
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
