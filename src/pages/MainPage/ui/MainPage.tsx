import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Page } from "@/widgets/Page";
import UserList from "@/widgets/UserList/ui/UserList";
import { Row, Col, Typography } from "antd";

const { Title } = Typography;

const MainPage = memo(() => {
  const { t } = useTranslation("main");

  return (
    <Row justify="center" style={{ padding: "20px", textAlign: "center" }}>
      <Col span={24}>
        <Page>
          <Title
            level={1}
            style={{
              background: "linear-gradient(90deg, orange, green)",
              backgroundSize: "200% auto",
              animation: "gradient 5s ease infinite",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: 0,
            }}
          >
            {t("Vulnerability Analyzer")}
          </Title>
        </Page>
        <UserList />
      </Col>

      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </Row>
  );
});

export default MainPage;
