import { Modules } from "./modules.enum";
import { Pages } from "./pages.enum";

export const NavigateRoutes = {
  LOGIN: `/${Modules.AUTH}/${Pages.LOGIN}`,
  REGISTER: `/${Modules.AUTH}/${Pages.REGISTER}`,
  DASHBOARD: `/${Modules.PLATFORM}/${Modules.DASHBOARD}`,
  MANAGE_PRODUCTS: `/${Modules.PLATFORM}/${Modules.PRODUCTS}/${Pages.MANAGE_PRODUCTS}`,
};
