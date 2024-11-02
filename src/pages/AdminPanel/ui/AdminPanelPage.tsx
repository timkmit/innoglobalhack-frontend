import React from "react";
import { Card, Input, Button, Form, ConfigProvider, Typography, notification } from "antd";
import { useAddReviewMutation } from "@/shared/api/rtkApi";

const { Title, Text } = Typography;

const AdminPanelPage: React.FC = () => {
  const [addReview, { isLoading }] = useAddReviewMutation();
  const [form] = Form.useForm();

  const onFinish = async (values: { ID_reviewer: number; ID_under_review: number; review: string }) => {
    try {
      await addReview(values).unwrap();
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
        <Card bordered={false} style={{ marginBottom: "20px", backgroundColor: "#2C2C2C" }}>
          <Title level={2} style={{ color: "#FFFFFF" }}>Админ панель - Добавить отзыв</Title>
        </Card>

        <Card bordered={false} style={{ backgroundColor: "#2C2C2C" }}>
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
              label={<Text style={{ color: "#FFFFFF" }}>ID автора отзыва</Text>}
              name="ID_reviewer"
              rules={[{ required: true, message: "Введите ID автора" }]}
            >
              <Input type="number" placeholder="ID автора" style={{ backgroundColor: "#333", color: "#FFFFFF", borderColor: "#5A9BD5" }} />
            </Form.Item>
            <Form.Item
              label={<Text style={{ color: "#FFFFFF" }}>ID человека, которого оценивают</Text>}
              name="ID_under_review"
              rules={[{ required: true, message: "Введите ID человека под отзывом" }]}
            >
              <Input type="number" placeholder="ID под отзывом" style={{ backgroundColor: "#333", color: "#FFFFFF", borderColor: "#5A9BD5" }} />
            </Form.Item>
            <Form.Item
              label={<Text style={{ color: "#FFFFFF" }}>Текст отзыва</Text>}
              name="review"
              rules={[{ required: true, message: "Введите текст отзыва" }]}
            >
              <Input.TextArea rows={4} placeholder="Введите текст отзыва" style={{ backgroundColor: "#333", color: "#FFFFFF", borderColor: "#5A9BD5" }} />
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
