import { Outlet } from "react-router";
import { Navbar } from "./Navbar";

export const Layout: React.FC = () => {
  return (
    <div>
       <Navbar /> 
      {<Outlet />}
    </div>
  );
};
