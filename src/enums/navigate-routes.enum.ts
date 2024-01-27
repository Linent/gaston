import { Modules } from "./modules.enum";
import { Pages } from "./pages.enum";

export const NavigateRoutes = {
  LOGIN: `/${Modules.AUTH}/${Pages.LOGIN}`,
  REGISTER: `/${Modules.AUTH}/${Pages.REGISTER}`,
  DASHBOARD: `/${Modules.PLATFORM}/${Modules.DASHBOARD}`,
  MANAGE_PRODUCTS: `/${Modules.PLATFORM}/${Modules.PRODUCTS}/${Pages.MANAGE_PRODUCTS}`,
  PRODUCT_BY_ID: `/${Modules.PLATFORM}/${Modules.PRODUCTS}/${Pages.PRODUCT_BY_ID}`,
  MANAGE_MOVEMENTS: `/${Modules.PLATFORM}/${Modules.MOVEMENTS}/${Pages.MANAGE_MOVEMENTS}`,
  CREATE_MOVEMENT: `/${Modules.PLATFORM}/${Modules.MOVEMENTS}/${Pages.CREATE_MOVEMENT}`,
};
