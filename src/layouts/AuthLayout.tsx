import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <main className="w-full h-screen flex items-center justify-center p-4 bg-accent/50">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
