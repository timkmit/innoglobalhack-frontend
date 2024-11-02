import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, Typography, ConfigProvider, message } from "antd";
import { SignInDto, useSignInMutation, useUserActions } from "@/entities/User";
import { USER_ACCESS_TOKEN } from "@/shared/consts/localStorage";
import { getRouteProfile } from "@/shared/consts/router";

const { Title } = Typography;

const LoginPage: React.FC = () => {
  const [authData, setAuthData] = useState<SignInDto>({
    login: "",
    password: "",
  });
  const [signIn, { isLoading }] = useSignInMutation();
  const navigate = useNavigate();
  const { setAuthData: setAuthDataRedux } = useUserActions();

  const onSubmit = async () => {
    try {
      const response = await signIn(authData).unwrap();
      console.log("Response from signIn:", response);

      if (response && response.access_token) {
        localStorage.setItem(USER_ACCESS_TOKEN, response.access_token);
        console.log("Token saved to localStorage:", response.access_token);

        const user = { ...response, accessToken: response.access_token };
        setAuthDataRedux(user);
        navigate(getRouteProfile());
      } else {
        throw new Error("Токен не получен");
      }
    } catch (error) {
      console.error("Authorization error:", error);
      message.error("Ошибка авторизации. Проверьте ваши данные.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem(USER_ACCESS_TOKEN);
    console.log("Token retrieved on load:", token);
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: "#1F1F1F",
          colorText: "#FFFFFF",
          colorTextHeading: "#FFFFFF",
          colorBorder: "#333333",
        },
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#1F1F1F" }}>
        <Card style={{ maxWidth: 400, width: "100%", padding: "20px", backgroundColor: "#2C2C2C", borderColor: "#333333" }} bordered={false}>
          <Title level={3} style={{ textAlign: "center", color: "#FFFFFF" }}>Вход в систему</Title>
          <Form layout="vertical" onFinish={onSubmit}>
            <Form.Item label={<span style={{ color: "#FFFFFF" }}>Логин</span>} required>
              <Input
                value={authData.login}
                onChange={(e) => setAuthData((prev) => ({ ...prev, login: e.target.value }))}
                placeholder="Введите ваш логин"
                style={{ backgroundColor: "#333333", color: "#FFFFFF", borderColor: "#555555" }}
              />
            </Form.Item>
            <Form.Item label={<span style={{ color: "#FFFFFF" }}>Пароль</span>} required>
              <Input.Password
                value={authData.password}
                onChange={(e) => setAuthData((prev) => ({ ...prev, password: e.target.value }))}
                placeholder="Введите ваш пароль"
                style={{ backgroundColor: "#333333", color: "#FFFFFF", borderColor: "#555555" }}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isLoading} block style={{ backgroundColor: "#5A9BD5", borderColor: "#5A9BD5" }}>
                Войти
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </ConfigProvider>
  );
};

export default LoginPage;
