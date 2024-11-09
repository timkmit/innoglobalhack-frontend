import React, { useState } from "react";
import { Card, ConfigProvider, Typography, Spin, Alert, Select } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import {  useGetAllAnalysisRequestsQuery } from "@/shared/api/rtkApi";
import Header from "@/widgets/Header/ui/Header";
import ReviewForm from "@/widgets/ReviewForm/ui/ReviewForm";

const { Title, Text } = Typography;
const { Option } = Select;

const AdminPanelPage: React.FC = () => {


  const { data: analysisRequests = [], error: analysisError, isLoading: isAnalysisLoading } = useGetAllAnalysisRequestsQuery();
  const [sortOrder, setSortOrder] = useState<"default" | "asc" | "desc">("default");
  const [expandedResults, setExpandedResults] = useState<{ [key: number]: boolean }>({});

  const renderAnalysisResult = (result: string | string[] | null) => {
    if (!result) {
      return <Text style={{ color: "#FFFFFF" }}>Результат анализа отсутствует</Text>;
    }
  
    const formattedResult = Array.isArray(result) ? result.join("\n") : result;
  
    return formattedResult.split("\n").map((line, index) => (
      <Text 
        key={index} 
        style={{ color: "#FFFFFF", display: "block" }}
      >
        {line.trim() === '' ? <br /> : line}
      </Text>
    ));
  };

  const sortedAnalysisRequests = [...analysisRequests].sort((a, b) => {
    if (sortOrder === "asc") return a.id - b.id;
    if (sortOrder === "desc") return b.id - a.id;
    return 0;
  });

  const handleSortChange = (value: "default" | "asc" | "desc") => {
    setSortOrder(value);
  };

  const toggleResult = (id: number) => {
    setExpandedResults((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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
        <Header/>

        <ReviewForm />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>
          <Title level={5} style={{ color: "#FFFFFF", marginBottom: 0 }}>История запросов анализа</Title>
          <Select
            defaultValue="default"
            onChange={handleSortChange}
            style={{ width: 200, color: "#000000" }}
          >
            <Option value="default">Без сортировки</Option>
            <Option value="asc">От самых старых</Option>
            <Option value="desc">От самых новых</Option>
          </Select>
        </div>

        <Card bordered={false} style={{ backgroundColor: "#2C2C2C", marginTop: "10px" }}>
          {isAnalysisLoading ? (
            <div style={{ textAlign: "center", padding: "20px" }}><Spin /></div>
          ) : analysisError ? (
            <Alert message="Ошибка" description="Не удалось загрузить историю запросов." type="error" showIcon />
          ) : (
            sortedAnalysisRequests.map((request) => (
              <Card
                key={request.id}
                style={{
                  backgroundColor: "#333",
                  marginBottom: "10px",
                  padding: "10px",
                  borderRadius: "8px",
                }}
                bordered={false}
              >
                <Text style={{ color: "#FFFFFF" }}>
                  <strong>ID запроса:</strong> {request.id}
                </Text>
                <br />
                <Text style={{ color: "#FFFFFF" }}>
                  <strong>Статус:</strong> {request.analysis_status}
                </Text>
                <br />
                <Text style={{ color: "#FFFFFF" }}>
                  <strong>Сотрудники:</strong> {request.worker_ids.join(", ")}
                </Text>
                <br />
                <Text style={{ color: "#FFFFFF" }}>
                  <strong>Общая оценка:</strong> {request.average || "Не указана"}
                </Text>
                <br />
                <Text
                  onClick={() => toggleResult(request.id)}
                  style={{ color: "#FFFFFF", cursor: "pointer", display: "flex", alignItems: "center" }}
                >
                  Критерии и сводка
                  {expandedResults[request.id] ? <UpOutlined style={{ marginLeft: 8 }} /> : <DownOutlined style={{ marginLeft: 8 }} />}
                </Text>
                {expandedResults[request.id] && (
                  <div style={{ paddingLeft: "20px", marginTop: "10px" }}>
                    {renderAnalysisResult(request.analysis_result)}
                  </div>
                )}
              </Card>
            ))
          )}
        </Card>
      </div>
    </ConfigProvider>
  );
};

export default AdminPanelPage;
