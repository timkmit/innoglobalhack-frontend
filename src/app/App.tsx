import { Suspense, useEffect } from "react";
import { AppRouter } from "./providers/router";
import { PageLoader } from "@/widgets/PageLoader";
import { GlobalStyles } from "./styles/globalStyles";
import { USER_ACCESS_TOKEN } from "@/shared/consts/localStorage";
import { useUserActions } from "@/entities/User";

const App = () => {
  const { setAuthData } = useUserActions();

  useEffect(() => {

    const token = localStorage.getItem(USER_ACCESS_TOKEN);

    if (token) {
      setAuthData({
			access_token: token,
			id: "",
			username: "Лучшая Эйчар"
	});
    }
  }, []);

  return (
    <div>
      <GlobalStyles />
      <Suspense fallback={<PageLoader />}>
        <div className="content-page">
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
};

export default App;
