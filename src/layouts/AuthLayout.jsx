import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main>
      AuthLayout
      <Outlet />
    </main>
  );
};

export default AuthLayout;
