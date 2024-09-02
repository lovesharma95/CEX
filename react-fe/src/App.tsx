import { GoogleOAuthProvider } from "@react-oauth/google";
import { Suspense } from "react";

import Loader from "./components/Loader";
import { Routes } from "./routes";

function App() {
  return (
    <div>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Suspense fallback={<Loader />}>
          <Routes />
        </Suspense>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
