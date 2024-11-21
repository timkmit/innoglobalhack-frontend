import React, { useState } from "react";
import { Typography, Select, Rate, Input, Button, message, Space } from "antd";
import styled from "styled-components";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const { TextArea } = Input;

const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #2c2c2c;
  border-radius: 8px;
  margin-top: 20px;
`;

const StyledButton = styled(Button)`
  background-color: #5A9BD5 !important;
  color: #fff !important;
  border-color: #5A9BD5 !important;
  box-shadow: none !important;
  margin-top: 20px;
`;

const ReviewPage: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [likedMost, setLikedMost] = useState<string>("");
  const [likedLeast, setLikedLeast] = useState<string>("");
  const [additionalComment, setAdditionalComment] = useState<string>("");

  const handleSubmit = () => {
    if (!selectedEvent) {
      message.warning("Пожалуйста, выберите мероприятие.");
      return;
    }

    if (rating === undefined) {
      message.warning("Пожалуйста, оцените мероприятие.");
      return;
    }

    if (!likedMost.trim()) {
      message.warning("Пожалуйста, укажите, что понравилось больше всего.");
      return;
    }

    if (!likedLeast.trim()) {
      message.warning("Пожалуйста, укажите, что понравилось меньше всего.");
      return;
    }

    const formData = {
      event: selectedEvent,
      rating,
      likedMost,
      likedLeast,
      additionalComment,
    };

    console.log("Submitted Data:", formData);
    message.success("Ваш отзыв отправлен. Спасибо!");
  };

  const navigate = useNavigate();

  return (
      <Wrapper>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/")}
          style={{
            marginBottom: "20px",
            color: "#FFFFFF",
            borderColor: "#FFFFFF",
          }}
        >
          Назад
        </Button>
        <Title level={2} style={{ color: "#ffffff", textAlign: "center" }}>Оценка мероприятия</Title>

        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div>
            <Text style={{ display: "block", marginBottom: "8px" }}>
              Выберите мероприятие
            </Text>
            <Select
              placeholder="Выберите мероприятие"
              style={{ width: "100%" }}
              onChange={(value) => setSelectedEvent(value)}
              value={selectedEvent}
              options={[
                { label: "Мероприятие 1", value: "event1" },
                { label: "Мероприятие 2", value: "event2" },
                { label: "Мероприятие 3", value: "event3" },
              ]}
            />
          </div>

          <div>
            <Text style={{ display: "block", marginBottom: "8px" }}>
              Оцените мероприятие
            </Text>
            <Rate
              onChange={(value) => setRating(value)}
              value={rating}
            />
          </div>

          <div>
            <Text style={{ display: "block", marginBottom: "8px" }}>
              Что понравилось больше всего?
            </Text>
            <TextArea
              placeholder="Опишите, что вам понравилось больше всего"
              value={likedMost}
              onChange={(e) => setLikedMost(e.target.value)}
              rows={4}
            />
          </div>

          <div>
            <Text style={{ display: "block", marginBottom: "8px" }}>
              Что понравилось меньше всего?
            </Text>
            <TextArea
              placeholder="Опишите, что вам понравилось меньше всего"
              value={likedLeast}
              onChange={(e) => setLikedLeast(e.target.value)}
              rows={4}
            />
          </div>

          <div>
            <Text style={{ display: "block", marginBottom: "8px" }}>
              Дополнительный комментарий
            </Text>
            <TextArea
              placeholder="Добавьте любой дополнительный комментарий"
              value={additionalComment}
              onChange={(e) => setAdditionalComment(e.target.value)}
              rows={4}
            />
          </div>
        </Space>

        <StyledButton type="primary" block onClick={handleSubmit}>
          Отправить
        </StyledButton>
      </Wrapper>
  );
};

export default ReviewPage;
