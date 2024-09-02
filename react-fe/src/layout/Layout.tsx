import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import AppBar from "./AppBar";

function Layout() {
  return (
    <div>
      <AppBar />

      <div className="pt-4">
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}

export default Layout;
