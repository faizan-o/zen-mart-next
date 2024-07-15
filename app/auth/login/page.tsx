import LoginForm from "@/components/auth/login-form";
import React from "react";

const LoginPage = () => {
  return (
    <>
      <div className="absolute w-full flex flex-wrap justify-between px-2 bg-red-600 py-1 top-0">
        <h1 className="text-[10px]">admin-email: admin@admin.com</h1>
        <h1 className="text-[10px]">admin-password: password</h1>
      </div>
      <LoginForm />;
    </>
  );
};

export default LoginPage;
