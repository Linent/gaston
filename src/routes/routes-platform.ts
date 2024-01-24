import { Modules, Pages } from "../enums";
import { IRoutes } from "../interfaces";


const DASHBOARD: IRoutes = {
	isActive: true,
	module: Modules.DASHBOARD,
	showInSidebar: true,
	Component: '',
};

/* const ROLES = {
	isActive: false,
	module: Modules.ROLES,
	showInSidebar: false,
	childrenRoutes: [
		{
			isActive: true,
			showInSidebar: true,
			name: Pages.CREATE_ROLE_ADMIN,
			Component: CreateRoleAdmin,
		},
	],
}; */

export const PLATFORM_ROUTES: IRoutes[] = [
	DASHBOARD,
];