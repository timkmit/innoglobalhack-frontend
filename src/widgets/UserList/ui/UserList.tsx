import React, { useState } from "react";
import { Table, Button, ConfigProvider, Modal, Tooltip, Input, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetAllUsersQuery, useGetUserReviewsQuery } from "@/shared/api/rtkApi";

const UserList: React.FC = () => {
  const navigate = useNavigate();
  const { data: response = { worker_ids: [] }, error, isLoading } = useGetAllUsersQuery();
  const users: string[] = response.worker_ids;

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showTooltip, setShowTooltip] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data: reviews, isLoading: isReviewsLoading } = useGetUserReviewsQuery(selectedIds, {
    skip: !isModalVisible || selectedIds.length === 0,
  });

  const handleTooltipClose = () => {
    setShowTooltip(false);
    localStorage.setItem("tooltipShown", "true");
  };

  const columns = [
    {
      title: <span style={{ color: '#FFFFFF' }}>ID сотрудника</span>,
      dataIndex: "id",
      render: (id: string) => (
        <a
          onClick={() => navigate(`/profile/${id}`)}
          style={{ color: selectedRowKeys.includes(id) ? '#000000' : '#FFFFFF' }}
        >
          {id}
        </a>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
  };

  const handleSubmit = () => {
    setSelectedIds(selectedRowKeys.map(key => key.toString()));
    setSelectedRowKeys([]);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  const filteredUsers = users.filter((user: string) => user.includes(searchTerm));

  return (
    <ConfigProvider theme={{ token: { colorBgContainer: "#1F1F1F", colorText: "#FFFFFF" } }}>
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "50px 0" }}>
        <Input
          prefix={<span style={{ color: "white" }}>Поиск ID: </span>}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            marginBottom: 16,
            borderColor: "#5A9BD5",
            color: "white",
            backgroundColor: "#333",
            padding: "4px 8px",
            borderRadius: "4px",
          }}
        />

        {isLoading ? (
          <div style={{ textAlign: "center", color: "#FFFFFF" }}>Загрузка...</div>
        ) : error ? (
          <div style={{ textAlign: "center", color: "#FF4D4F" }}>Ошибка при загрузке пользователей</div>
        ) : (
          <Table
            rowSelection={rowSelection} 
            columns={columns}
            dataSource={filteredUsers.map((id) => ({ key: id, id }))}
            pagination={false}
            rowClassName={(record) =>
              selectedRowKeys.includes(record.id) ? "selected-row" : "default-row"
            }
            bordered
          />
        )}

        <Tooltip
          title="Если Вам необходимо получить уязвимые места группы людей, выберите их из списка и нажмите 'Анализ'"
          open={showTooltip}
          onOpenChange={handleTooltipClose}
        >
          <Button
            type="primary"
            onClick={handleSubmit}
            style={{
              marginTop: 16,
              color: "#FFFFFF",
              backgroundColor: "#333",
              borderColor: "#5A9BD5",
              borderWidth: 1,
              borderStyle: "solid",
              borderRadius: "4px",
            }}
            disabled={selectedRowKeys.length === 0}
          >
            Анализ
          </Button>
        </Tooltip>
      </div>

      <Modal
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalOk}
        style={{ color: "#000000" }}
        styles={{ body: { color: "#000000" } }}
      >
        <p style={{ color: "#000000", fontSize: "large" }}>Отзывы сотрудников</p>
        {isReviewsLoading ? (
          <Spin style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }} />
        ) : reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.worker_id}>
              <p style={{ color: "#000000" }}>ID сотрудника: {review.worker_id}</p>
              <p style={{ color: "#000000" }}>Отзывы:</p>
              <ul>
                {Array.isArray(review.user_feedback) ? (
                  review.user_feedback.map((feedback, index) => (
                    <li key={index} style={{ color: "#000000" }}>{feedback}</li>
                  ))
                ) : (
                  <li style={{ color: "#000000" }}>Нет отзывов</li>
                )}
              </ul>
            </div>
          ))
        ) : (
          <p style={{ color: "#000000" }}>Нет отзывов для выбранных сотрудников.</p>
        )}
      </Modal>
    </ConfigProvider>
  );
};

export default UserList;
