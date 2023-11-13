import React, { useState } from "react";
import AuthLogin from "@/components/Auth/AuthLogin";
import AuthRegister from "@/components/Auth/AuthRegister";

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);
  const changeForm = () => setShowLogin(!showLogin);

  return (
    <>
      {showLogin ? (
        <AuthLogin changeForm={changeForm} />
      ) : (
        <AuthRegister changeForm={changeForm} />
      )}
    </>
  );
};

export default Login;
