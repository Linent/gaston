import { Navigate, Outlet } from "react-router";

export const ProtectedRoutes = () => {
  const isAuth = localStorage.getItem('auth'); //como anos se llame
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};