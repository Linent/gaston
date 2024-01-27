import { Modules, Pages } from "../enums";

export interface IRoute {
  isActive: boolean;
  showInSidebar: boolean;
  module: Modules;
  childrenRoutes?: IChildrenRoute[];
  label: string;
  icon?: string;
}

export interface IChildrenRoute {
  isActive: boolean;
  showInSidebar: boolean;
  name: Pages;
  label: string;
}