import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Typography, ConfigProvider, Button, Spin, Alert } from "antd";
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
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
    <Spin />
  </div>
) : error ? (
  <Alert message="Ошибка" description="Не удалось загрузить отзывы." type="error" showIcon />
) : (
  <div style={{ maxHeight: "400px", overflowY: "auto", paddingRight: "10px" }}>
    {reviews.map((review, reviewIndex) => (
      <div key={reviewIndex} style={{ marginBottom: "20px" }}>

        {Array.isArray(review.user_feedback) ? (
          review.user_feedback.map((feedback, index) => (
            <Card
              key={index}
              bordered={false}
              style={{
                backgroundColor: "#333",
                marginBottom: "10px",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <Text style={{ color: "#FFFFFF" }}>{feedback}</Text>
            </Card>
          ))
        ) : (
          <Text style={{ color: "#FFFFFF" }}>Нет отзывов</Text>
        )}
      </div>
    ))}
  </div>
)}
        </Card>
      </div>
    </ConfigProvider>
  );
};

export default ProfilePage;
