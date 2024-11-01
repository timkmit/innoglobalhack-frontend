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
export const getRouteProfile = () => "profile";
export const getRouteNotFound = () => "*";
