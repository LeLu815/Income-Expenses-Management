import { useState } from "react";
import { RouterProvider } from "react-router-dom";

import { LogContext, SetLogContext } from "./context/LogContext";
import router from "./routes/routes";

import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  return (
    <LogContext.Provider value={posts}>
      <SetLogContext.Provider value={setPosts}>
        <RouterProvider router={router} />
      </SetLogContext.Provider>
    </LogContext.Provider>
  );
}

export default App;
