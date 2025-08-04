import { useAuth } from "@/auth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = () => {
  const { user, authenticated } = useAuth();

  return user && authenticated ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} replace />
  );
};

export default ProtectRoute;
