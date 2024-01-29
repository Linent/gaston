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
      label: "Gestionar productos",
    },
  ],
};

const MOVEMENTS: IRoute = {
  isActive: false,
  module: Modules.MOVEMENTS,
  showInSidebar: false,
  label: "Movimientos",
  icon: Icons.MOVEMENT,
  childrenRoutes: [
    {
      isActive: true,
      showInSidebar: true,
      name: Pages.MANAGE_MOVEMENTS,
      label: "Gestionar movimientos",
    },
    {
      isActive: true,
      showInSidebar: true,
      name: Pages.CREATE_MOVEMENT,
      label: "Crear movimientos",
    },
  ],
};

export const PLATFORM_ROUTES: IRoute[] = [DASHBOARD, PRODUCTS, MOVEMENTS];
