import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import "./App.css";
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
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
