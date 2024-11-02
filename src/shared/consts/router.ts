export enum AppRoutes {
	MAIN = "main",
	NOT_FOUND = "not_found",
	LOGIN = "login",
	PROFILE = "profile",
	ADMINPANEL = "adminpanel"
}

export const getRouteMain = () => "/main";
export const getRouteLogin = () => "/login";
export const getRouteProfile = (id: string = ':id') => `/profile/${id}`;
export const getRouteAdminPanel = () => "/adminpanel";
export const getRouteNotFound = () => "*";
