import React, { useState } from "react";
import { Table, Button, ConfigProvider, Modal } from "antd";
import { useNavigate } from "react-router-dom";

interface User {
  key: number;
  id: string;
}

const UserList: React.FC = () => {
  const navigate = useNavigate();

  const users: User[] = Array.from({ length: 10 }, (_, i) => ({
    key: i,
    id: `Сотрудник-${i}`,
  }));

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const columns = [
    {
      title: <span style={{ color: '#FFFFFF' }}>ID сотрудника</span>, 
      dataIndex: "id",
      render: (id: string, record: User) => (
        <a
          onClick={() => navigate(`/profile/${id}`)}
          style={{ color: selectedRowKeys.includes(record.key) ? '#000000' : '#FFFFFF' }}
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
    console.log("Выбранные IDs:", selectedRowKeys);
    setSelectedIds(selectedRowKeys.map(key => users[key as number].id));
    setSelectedRowKeys([]);
    setIsModalVisible(true); 
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  return (
    <ConfigProvider theme={{ token: { colorBgContainer: '#1F1F1F', colorText: '#FFFFFF' } }}>
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "50px 0" }}>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={users}
          pagination={false}
          rowClassName="dark-row"
        />
        <Button
          type="primary"
          onClick={handleSubmit}
          style={{ marginTop: 16, color: '#FFFFFF' }} 
          disabled={selectedRowKeys.length === 0}
        >
          Отправить
        </Button>
      </div>

      <Modal 
        open={isModalVisible} 
        onOk={handleModalOk} 
        onCancel={handleModalOk}
        style={{ color: '#000000' }}
      >
        <p style={{ color: '#000000', fontSize: 'large'}}>Сообщение</p>
        <p style={{ color: '#000000' }}>Вы выбрали следующие ID: {selectedIds.join(", ")}</p> 
      </Modal>
    </ConfigProvider>
  );
};

export default UserList;
