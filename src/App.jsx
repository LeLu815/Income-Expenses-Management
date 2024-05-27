import { useEffect } from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import router from "./routes/routes";
import GlobalStyles from "./styles/globalStyles";
import { setDataToSession } from "./util/storageFunc";

import store from "./redux/store";

import "./App.css";

function App() {
  useEffect(() => {
    const newSelectedMonth = new Date().getMonth();
    setDataToSession("selectedMonth", newSelectedMonth);
  }, []);
  return (
    <>
      <GlobalStyles />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
