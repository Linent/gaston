import { Modules } from "./modules.enum";
import { Pages } from "./pages.enum";

export const  NavigateRoutes  = {
  LOGIN :`/${Modules.AUTH}/${Pages.LOGIN}`,
  REGISTER : `/${Modules.AUTH}/${Pages.REGISTER}`,
  DASHBOARD : `/${Modules.PLATFORM}/${Modules.DASHBOARD}`
}
