import { IRoute } from "../interfaces";
import { Modules } from "../enums";

const DASHBOARD: IRoute = {
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

export const PLATFORM_ROUTES: IRoute[] = [
	DASHBOARD,
];