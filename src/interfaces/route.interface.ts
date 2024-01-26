import { Modules, Pages } from "../enums";

export interface IRoute {
  isActive: boolean;
  showInSidebar: boolean;
  module: Modules;
  childrenRoutes?: IChildrenRoute[];
  Component?: React.ReactNode;
}

export interface IChildrenRoute {
  isActive: boolean;
  showInSidebar: boolean;
  name: Pages;
  Component: React.ReactNode;
}