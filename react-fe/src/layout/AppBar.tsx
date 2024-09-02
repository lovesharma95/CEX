import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Button from "../components/Button";
import { useGoogleAuth } from "../hooks/useGoogleLogin";

function AppBar() {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );

  const { signIn, signOut } = useGoogleAuth();

  return (
    <div className="border-b px-2 py-2 flex justify-between">
      <Link className="text-xl font-bold flex flex-col justify-center" to="/">
        DCEX
      </Link>
      <div>
        {isAuthenticated ? (
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
