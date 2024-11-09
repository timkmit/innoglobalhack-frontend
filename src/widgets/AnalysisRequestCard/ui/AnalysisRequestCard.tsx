// AnalysisRequestCard.tsx
import React, { useState } from "react";
import { Card, Typography } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface AnalysisRequestCardProps {
  request: {
    id: number;
    analysis_status: string;
    worker_ids: string[];
    average?: string;
    analysis_result: string | string[] | null;
  };
}

const AnalysisRequestCard: React.FC<AnalysisRequestCardProps> = ({ request }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(!expanded);

  const renderAnalysisResult = (result: string | string[] | null) => {
    if (!result) {
      return <Text style={{ color: "#FFFFFF" }}>Результат анализа отсутствует</Text>;
    }

    const formattedResult = typeof result === "string" ? result.split("\n") : result;

    return formattedResult.map((line, index) => (
      <Text key={index} style={{ color: "#FFFFFF", display: "block" }}>
        {line.trim() === '' ? <br /> : line}
      </Text>
    ));
  };

  return (
    <Card style={{ backgroundColor: "#333", marginBottom: "10px", padding: "10px", borderRadius: "8px" }} bordered={false}>
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
        <strong>Общая оценка:</strong> {request.average ?? "Не указана"}
      </Text>
      <br />
      <Text onClick={toggleExpanded} style={{ color: "#FFFFFF", cursor: "pointer", display: "flex", alignItems: "center" }}>
        Критерии и сводка {expanded ? <UpOutlined style={{ marginLeft: 8 }} /> : <DownOutlined style={{ marginLeft: 8 }} />}
      </Text>
      {expanded && (
        <div style={{ paddingLeft: "20px", marginTop: "10px" }}>
          {renderAnalysisResult(request.analysis_result)}
        </div>
      )}
    </Card>
  );
};

export default AnalysisRequestCard;
