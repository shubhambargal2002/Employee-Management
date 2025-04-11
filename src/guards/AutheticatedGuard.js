import { Navigate, Outlet } from "react-router-dom";

const AuthenticatedGuard = () => {
  const token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default AuthenticatedGuard;
