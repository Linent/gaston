import { Navigate, Outlet } from "react-router";
import { StorageKeys } from "../enums";

export const ProtectedRoutes = () => {
  const isAuth = localStorage.getItem(StorageKeys.TOKEN);
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};