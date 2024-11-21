import { Suspense, useEffect } from "react";
import { AppRouter } from "./providers/router";
import { PageLoader } from "@/widgets/PageLoader";
import { GlobalStyles } from "./styles/globalStyles";
import { USER_ACCESS_TOKEN } from "@/shared/consts/localStorage";
import { useUserActions } from "@/entities/User";
import { ConfigProvider } from "antd";

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
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: "#1f1f1f",
          colorText: "#ffffff",
          colorTextHeading: "#ffffff",
          colorBorder: "#333333",
        },
      }}
    >
      <GlobalStyles />
      <Suspense fallback={<PageLoader />}>
        <div className="content-page">
          <AppRouter />
        </div>
      </Suspense>
    </ConfigProvider>
  );
};

export default App;
