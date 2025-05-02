import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage?.getItem("Token");
  const isAuthUser = !!token;

  return isAuthUser ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
