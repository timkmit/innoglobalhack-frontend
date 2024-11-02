import React, { useState, useEffect } from "react";
import { Table, Button, ConfigProvider, Modal, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetAllWorkersQuery } from "../api/rtkApi";

interface User {
  key: number;
  id: string;
}

const UserList: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllWorkersQuery();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showTooltip, setShowTooltip] = useState(true);

  const users: User[] =
    data?.worker_ids.map((id: string, index: number) => ({ key: index, id })) || [];

  useEffect(() => {
    const tooltipShown = localStorage.getItem("tooltipShown");
    if (tooltipShown) setShowTooltip(false);
  }, []);

  const handleTooltipClose = () => {
    setShowTooltip(false);
    localStorage.setItem("tooltipShown", "true");
  };

  const columns = [
    {
      title: <span style={{ color: "#FFFFFF" }}>ID сотрудника</span>,
      dataIndex: "id",
      render: (id: string, record: User) => (
        <a
          onClick={() => navigate(`/profile/${id}`)}
          style={{
            color: selectedRowKeys.includes(record.key) ? "#000000" : "#FFFFFF",
          }}
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
    setSelectedIds(selectedRowKeys.map((key) => users[key as number].id));
    setSelectedRowKeys([]);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: "#1F1F1F",
          colorText: "#FFFFFF",
          colorBgElevated: "#333333",
        },
      }}
    >
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "50px 0" }}>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={users}
            pagination={false}
            rowClassName="dark-row"
          />
        )}
        <Tooltip
          title="Если Вам необходимо получить уязвимые места группы людей, выберите их из списка и нажмите 'Отправить'"
          open={showTooltip}
          onOpenChange={handleTooltipClose}
          overlayInnerStyle={{ backgroundColor: "#333333", color: "#FFFFFF" }}
        >
          <Button
            type="primary"
            onClick={handleSubmit}
            style={{ marginTop: 16, color: "#FFFFFF" }}
            disabled={selectedRowKeys.length === 0}
          >
            Отправить
          </Button>
        </Tooltip>
      </div>

      <Modal
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalOk}
        style={{ color: "#000000" }}
      >
        <p style={{ color: "#000000", fontSize: "large" }}>Сообщение</p>
        <p style={{ color: "#000000" }}>
          Вы выбрали следующие ID: {selectedIds.join(", ")}
        </p>
      </Modal>
    </ConfigProvider>
  );
};

export default UserList;
