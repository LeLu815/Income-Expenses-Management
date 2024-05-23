import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./Layout";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" />
          <Route path="/expenses/:id" />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
