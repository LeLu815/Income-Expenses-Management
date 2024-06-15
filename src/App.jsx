import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import "./App.css";
import { AlertProvider } from "./context/alert.context";
import { ToastProvider } from "./context/toast.context";
import router from "./routes/routes";
import GlobalStyles from "./styles/globalStyles";
import { initialColor, setDataToSession } from "./util/storageFunc";

function App() {
  const queryClient = new QueryClient();

  useEffect(() => {
    const newSelectedMonth = new Date().getMonth();
    setDataToSession("selectedMonth", newSelectedMonth);
  }, []);
  useEffect(() => {
    // 최초에 한번만 실행할 것
    initialColor();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <AlertProvider>
          <GlobalStyles />
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </AlertProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;
