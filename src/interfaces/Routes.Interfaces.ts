import { Modules, Pages } from "../enums";

export interface IRoutes {
  isActive: boolean;
  showInSidebar: boolean;
  module: Modules;
  childrenRoutes?: IChildrenRoute[];
  Component?: any;
}

export interface IChildrenRoute {
  isActive: boolean;
  showInSidebar: boolean;
  name: Pages;
  Component: any;
}