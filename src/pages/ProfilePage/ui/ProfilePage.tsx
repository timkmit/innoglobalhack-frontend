import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, List, Typography, ConfigProvider, Button, Spin, Alert } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useGetUserReviewsQuery } from "@/shared/api/rtkApi";

const { Title, Text } = Typography;

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: reviews = [], error, isLoading } = useGetUserReviewsQuery([id!]);

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

        <Card title={<span style={{ color: "#FFFFFF" }}>Отзывы</span>} bordered={false} style={{ backgroundColor: "#2C2C2C" }}>
          {isLoading ? (
            <Spin tip="Загрузка отзывов..." />
          ) : error ? (
            <Alert message="Ошибка" description="Не удалось загрузить отзывы." type="error" showIcon />
          ) : (
            <div style={{ maxHeight: "400px", overflowY: "auto", paddingRight: "10px" }}>
              <List
                dataSource={reviews}
                renderItem={(review) => (
                  <List.Item>
                    <Text style={{ color: "#FFFFFF" }}>{review.user_feedback}</Text>
                  </List.Item>
                )}
              />
            </div>
          )}
        </Card>
      </div>
    </ConfigProvider>
  );
};

export default ProfilePage;
