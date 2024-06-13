import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import "./App.css";
import store from "./redux/store";
import router from "./routes/routes";
import GlobalStyles from "./styles/globalStyles";
import { setDataToSession } from "./util/storageFunc";

function App() {
  const queryClient = new QueryClient();

  useEffect(() => {
    const newSelectedMonth = new Date().getMonth();
    setDataToSession("selectedMonth", newSelectedMonth);
  }, []);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
