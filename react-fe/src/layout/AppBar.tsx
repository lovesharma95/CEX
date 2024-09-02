import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";

import Button from "../components/Button";

function AppBar() {
  const [session, setSession] = useState<any>(null);

  const signOut = () => {
    setSession(null);
  };

  const signIn = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("tokenResponse", tokenResponse);

      setSession({ data: { user: tokenResponse } });
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  return (
    <div className="border-b px-2 py-2 flex justify-between">
      <Link className="text-xl font-bold flex flex-col justify-center" to="/">
        DCEX
      </Link>
      <div>
        {session?.data?.user ? (
          <Button onClick={signOut} type="btn-primary">
            Logout
          </Button>
        ) : (
          <Button onClick={() => signIn()} type="btn-primary">
            SignIn
          </Button>
        )}
      </div>
    </div>
  );
}

export default AppBar;
