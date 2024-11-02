import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Page } from "@/widgets/Page";
import UserList from "@/widgets/UserList/ui/UserList";
import { Row, Col } from "antd";

const MainPage = memo(() => {
  const { t } = useTranslation("main");

  return (
    <Row justify="center" style={{ padding: "20px" }}>
      <Col span={24}>
        <Page>{t("Главная страница")}</Page>
        <UserList />
      </Col>
    </Row>
  );
});

export default MainPage;
