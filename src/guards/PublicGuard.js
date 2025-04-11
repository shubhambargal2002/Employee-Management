import { Navigate, Outlet } from "react-router-dom";

const PublicGuard = () => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicGuard;
