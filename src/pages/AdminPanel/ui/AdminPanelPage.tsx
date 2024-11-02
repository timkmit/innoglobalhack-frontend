import React from "react";
import { Card, Input, Button, Form, ConfigProvider, Typography, notification } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useAddReviewMutation } from "@/shared/api/rtkApi";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const AdminPanelPage: React.FC = () => {
  const [addReview, { isLoading }] = useAddReviewMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values: { reviewer_id: number; worker_id: number; review_text: string }) => {
    try {
      const payload = {
        reviewer: values.reviewer_id,
        under_review: values.worker_id,
        review: values.review_text,
      };

      await addReview(payload).unwrap();
      notification.success({
        message: "Успешно",
        description: "Отзыв успешно добавлен!",
      });
      form.resetFields();
    } catch (error) {
      notification.error({
        message: "Ошибка",
        description: "Не удалось добавить отзыв.",
      });
    }
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
          <Title level={2} style={{ color: "#FFFFFF" }}>Панель администрирования</Title>
          <Title level={5} style={{ color: "#FFFFFF" }}>для добавления отзывов</Title>
        </Card>

        <Card bordered={false} style={{ backgroundColor: "#2C2C2C" }}>
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
              label={<Text style={{ color: "#FFFFFF" }}>ID автора отзыва</Text>}
              name="reviewer_id"
              rules={[{ required: true, message: "Введите ID автора" }]}
            >
              <Input type="number" style={{ backgroundColor: "#333", color: "#FFFFFF", borderColor: "#5A9BD5" }} />
            </Form.Item>
            <Form.Item
              label={<Text style={{ color: "#FFFFFF" }}>ID человека, которого оценивают</Text>}
              name="worker_id"
              rules={[{ required: true, message: "Введите ID человека под отзывом" }]}
            >
              <Input type="number" style={{ backgroundColor: "#333", color: "#FFFFFF", borderColor: "#5A9BD5" }} />
            </Form.Item>
            <Form.Item
              label={<Text style={{ color: "#FFFFFF" }}>Текст отзыва</Text>}
              name="review_text"
              rules={[{ required: true, message: "Введите текст отзыва" }]}
            >
              <Input.TextArea rows={4} style={{ backgroundColor: "#333", color: "#FFFFFF", borderColor: "#5A9BD5" }} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isLoading} style={{ backgroundColor: "#5A9BD5", borderColor: "#5A9BD5" }}>
                Добавить отзыв
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </ConfigProvider>
  );
};

export default AdminPanelPage;
