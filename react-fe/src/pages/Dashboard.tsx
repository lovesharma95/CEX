import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Greeting from "../components/Greeting";
import Assets from "../components/Assets";

function Dashboard() {
  const user = useSelector((state: any) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="pt-8 flex justify-center">
      <div className="max-w-xl bg-white rounded shadow-md w-full">
        <Greeting image={user.picture ?? ""} name={user.name ?? ""} />
        <Assets />
      </div>
    </div>
  );
}

export default Dashboard;
