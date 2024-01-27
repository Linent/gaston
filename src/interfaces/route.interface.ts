import { Modules, Pages } from "../enums";

export interface IRoute {
  isActive: boolean;
  showInSidebar: boolean;
  module: Modules;
  childrenRoutes?: IChildrenRoute[];
  label: string;
}

export interface IChildrenRoute {
  isActive: boolean;
  showInSidebar: boolean;
  name: Pages;
  label: string;
}