import { NotFoundPage } from "@/pages/NotFoundPage";
import { LazyMainPage } from "@/pages/MainPage";
import { AppRoutes, getRouteLogin, getRouteMain, getRouteNotFound,  getRouteProfile, getRouteAdminPanel, getRouteReviewPage } from "@/shared/consts/router";
import { AppRouteProps } from "@/shared/types/router";
import { LazyLoginPage } from "@/pages/Login";
import { LazyProfilePage } from "@/pages/ProfilePage";
import { LazyAdminPanelPage } from "@/pages/AdminPanel";
import { LazyReviewPage } from "@/pages/ReviewPage/ui/ReviewPage.lazy";

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
	[AppRoutes.MAIN]: {
		path: getRouteMain(),
		element: <LazyMainPage />,
		authOnly: true,
	},
	[AppRoutes.NOT_FOUND]: {
		path: getRouteNotFound(),
		element: <NotFoundPage />,
	},
	[AppRoutes.LOGIN]: {
		path: getRouteLogin(),
		element: <LazyLoginPage />,
	},
	[AppRoutes.PROFILE]: {
		path: getRouteProfile(':id'),
		element: <LazyProfilePage />,
		authOnly: true,
	},
	[AppRoutes.ADMINPANEL]: {
		path: getRouteAdminPanel(),
		element: <LazyAdminPanelPage />,
		authOnly: true,
	},
	[AppRoutes.REVIEWPAGE]: {
		path: getRouteReviewPage(),
		element: <LazyReviewPage />,
		authOnly: false,
	},
};
