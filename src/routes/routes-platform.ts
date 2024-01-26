import { FaShoppingBasket } from "react-icons/fa";

import { ProductsManagePage, Dashboard} from "../pages";

import { IRoute } from "../interfaces";
import { Modules, Pages } from "../enums";

const DASHBOARD: IRoute = {
  isActive: true,
  module: Modules.DASHBOARD,
  showInSidebar: true,
  Component: Dashboard,
	label: "Dashboard",
};

const PRODUCTS: IRoute = {
  isActive: false,
  module: Modules.PRODUCTS,
  showInSidebar: false,
	label: "Productos",
  icon: FaShoppingBasket,
  childrenRoutes: [
    {
      isActive: true,
      showInSidebar: true,
      name: Pages.MANAGE_PRODUCTS,
      Component: '',
			label: "Manejar productos",
    },
  ],
};

export const PLATFORM_ROUTES: IRoute[] = [DASHBOARD, PRODUCTS];
