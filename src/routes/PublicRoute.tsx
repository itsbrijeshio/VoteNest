import { useAuth } from "@/auth";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = ({ restricted = false }: { restricted?: boolean }) => {
  const { authenticated } = useAuth();

  return restricted && authenticated ? (
    <Navigate to={"/dashboard"} replace />
  ) : (
    <Outlet />
  );
};

export default PublicRoute;
