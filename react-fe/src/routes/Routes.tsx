import { Route, Routes as ReactRoutes, BrowserRouter } from "react-router-dom";
import { InvalidPage } from "./index";
import { lazy } from "react";

const Layout = lazy(() => import("../layout/Layout"));
const LandingPage = lazy(() => import("../pages/LandingPage"));
const Dashboard = lazy(() => import("../pages/Dashboard"));

const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/*" element={<InvalidPage />} />
        </Route>
      </ReactRoutes>
    </BrowserRouter>
  );
};

export default Routes;
