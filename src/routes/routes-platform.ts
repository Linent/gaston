import { IRoute } from "../interfaces";
import { Icons, Modules, Pages } from "../enums";

const DASHBOARD: IRoute = {
  isActive: true,
  module: Modules.DASHBOARD,
  showInSidebar: true,
	label: "Dashboard",
};

const PRODUCTS: IRoute = {
  isActive: false,
  module: Modules.PRODUCTS,
  showInSidebar: false,
	label: "Productos",
  icon: Icons.PRODUCT,
  childrenRoutes: [
    {
      isActive: true,
      showInSidebar: true,
      name: Pages.MANAGE_PRODUCTS,
			label: "Manejar productos",
    },
  ],
};

export const PLATFORM_ROUTES: IRoute[] = [DASHBOARD, PRODUCTS];
