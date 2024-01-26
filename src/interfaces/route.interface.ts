import { Modules, Pages } from "../enums";

export interface IRoute {
  isActive: boolean;
  showInSidebar: boolean;
  module: Modules;
  childrenRoutes?: IChildrenRoute[];
  Component?: any;
  label: string;
  icon?: any
}

export interface IChildrenRoute {
  isActive: boolean;
  showInSidebar: boolean;
  name: Pages;
  Component: any;
  label: string;
}