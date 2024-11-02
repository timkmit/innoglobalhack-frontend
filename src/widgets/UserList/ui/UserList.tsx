import React, { useState } from "react";
import { Table, Button, ConfigProvider, Modal, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetAllUsersQuery } from "@/shared/api/rtkApi";
const UserList: React.FC = () => {
  const navigate = useNavigate();
  const { data: response = { worker_ids: [] }, error, isLoading } = useGetAllUsersQuery();
  const users = response.worker_ids;

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showTooltip, setShowTooltip] = useState(true);

  React.useEffect(() => {
    const tooltipShown = localStorage.getItem("tooltipShown");
    if (tooltipShown) setShowTooltip(false);
  }, []);

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

  return (
    <ConfigProvider theme={{ token: { colorBgContainer: '#1F1F1F', colorText: '#FFFFFF' } }}>
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "50px 0" }}>
        {isLoading ? (
          <div style={{ textAlign: 'center', color: '#FFFFFF' }}>Загрузка...</div>
        ) : error ? (
          <div style={{ textAlign: 'center', color: '#FF4D4F' }}>Ошибка при загрузке пользователей</div>
        ) : (
          <Table
            rowSelection={rowSelection}
            columns={columns}
            //@ts-ignore
            dataSource={users.map((id, index) => ({ key: index, id }))} 
            pagination={false}
            rowClassName="dark-row"
          />
        )}
        <Tooltip 
          title="Если Вам необходимо получить уязвимые места группы людей, выберите их из списка и нажмите 'Отправить'" 
          open={showTooltip} 
          onOpenChange={handleTooltipClose}
        >
          <Button
            type="primary"
            onClick={handleSubmit}
            style={{ marginTop: 16, color: '#FFFFFF' }}
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
        style={{ color: '#000000' }}
      >
        <p style={{ color: '#000000', fontSize: 'large' }}>Сообщение</p>
        <p style={{ color: '#000000' }}>Вы выбрали следующие ID: {selectedIds.join(", ")}</p> 
      </Modal>
    </ConfigProvider>
  );
};

export default UserList;
