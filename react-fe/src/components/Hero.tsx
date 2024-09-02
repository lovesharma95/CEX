import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Button from "./Button";
import { useGoogleAuth } from "../hooks/useGoogleLogin";

function Hero() {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  const navigate = useNavigate();

  const { signIn } = useGoogleAuth();

  return (
    <div>
      <div className="text-6xl font-medium flex justify-center pt-8">
        <span>The Indian Cryptocurrency</span>

        <span className="text-blue-500 pl-4">Revolution</span>
      </div>
      <div className="flex justify-center pt-4 text-2xl text-slate-500">
        Create a frictionless wallet from India with just a Google Account.
      </div>
      <div className="flex justify-center pt-2 text-2xl text-slate-500">
        Convert your INR into Cryptocurrency
      </div>
      <div className="pt-8 flex justify-center">
        {isAuthenticated ? (
          <Button type="btn-secondary" onClick={() => navigate("/dashboard")}>
            Go to Dashboard
          </Button>
        ) : (
          <Button
            type="btn-secondary"
            onClick={() => {
              signIn();
            }}
          >
            Login with Google
          </Button>
        )}
      </div>
    </div>
  );
}

export default Hero;
