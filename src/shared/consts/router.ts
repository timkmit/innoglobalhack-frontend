export enum AppRoutes {
	MAIN = "main",
	NOT_FOUND = "not_found",
	LOGIN = "login",
	PROFILE = "profile",
	ADMINPANEL = "adminpanel",
	REVIEWPAGE = "reviewpage"
}

export const getRouteMain = () => "/";
export const getRouteLogin = () => "/login";
export const getRouteProfile = (id: string = ':id') => `/profile/${id}`;
export const getRouteAdminPanel = () => "/adminpanel";
export const getRouteReviewPage = () => "/reviewpage";
export const getRouteNotFound = () => "*";
