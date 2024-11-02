import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, List, Descriptions, Typography, ConfigProvider, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const reviews = [
    { id: 1, content: "Отличный сотрудник, всегда выполняет задачи вовремя." },
    { id: 2, content: "Показывает отличные результаты в командной работе." },
    { id: 3, content: "Очень ответственный и внимательный к деталям." },
  ];

  const summary = {
    projects: 12,
    experience: "3 года",
    rating: "5/5",
  };

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
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "20px" }}>
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate(-1)} 
          style={{ marginBottom: "20px", color: "#FFFFFF", borderColor: "#FFFFFF" }}
        >
          Назад
        </Button>

        <Card bordered={false} style={{ marginBottom: "20px", backgroundColor: "#2C2C2C" }}>
          <Title level={2} style={{ color: "#FFFFFF" }}>Профиль сотрудника: {id}</Title>
        </Card>

        <Card
          title={<span style={{ color: "#FFFFFF" }}>Краткая сводка</span>}
          bordered={false}
          style={{ marginBottom: "20px", backgroundColor: "#2C2C2C" }}
        >
          <Descriptions column={1} style={{ color: "#FFFFFF" }}>
            <Descriptions.Item><span style={{ color: "#FFFFFF" }}>Проектов: {summary.projects}</span></Descriptions.Item>
            <Descriptions.Item>Опыт: {summary.experience}</Descriptions.Item>
            <Descriptions.Item>Рейтинг: {summary.rating}</Descriptions.Item>
          </Descriptions>
        </Card>

        <Card title={<span style={{ color: "#FFFFFF" }}>Отзывы</span>} bordered={false} style={{ backgroundColor: "#2C2C2C" }}>
          <List
            dataSource={reviews}
            renderItem={(review) => (
              <List.Item>
                <Text style={{ color: "#FFFFFF" }}>{review.content}</Text>
              </List.Item>
            )}
          />
        </Card>
      </div>
    </ConfigProvider>
  );
};

export default ProfilePage;
