export enum AppRoutes {
	MAIN = "main",
	NOT_FOUND = "not_found",
	LOGIN = "login",
	REGISTER = "register",
	PROFILE = "profile"
}

export const getRouteMain = () => "/";
export const getRouteLogin = () => "/login";
export const getRouteRegister = () => "/register";
export const getRouteProfile = (id: string = ':id') => `/profile/${id}`;
export const getRouteNotFound = () => "*";
