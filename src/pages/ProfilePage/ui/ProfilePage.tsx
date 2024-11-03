import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Typography, ConfigProvider, Button, Spin, Alert, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useGetUserReviewsQuery, useStartSoloAnalysisMutation, useLazyGetAnalysisResultsQuery } from "@/shared/api/rtkApi";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title as ChartTitle, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ChartTitle, Tooltip, Legend);

const { Title, Text } = Typography;

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: reviews = [], error, isLoading } = useGetUserReviewsQuery([id!]);
  const [summary, setSummary] = useState<string | null>(null);
  const [criteriaData, setCriteriaData] = useState<Record<string, number> | null>(null);

  const [startSoloAnalysis, { isLoading: isSummaryLoading }] = useStartSoloAnalysisMutation();
  const [triggerGetAnalysisResults, { data: analysisResults, isLoading: isAnalysisLoading }] = useLazyGetAnalysisResultsQuery();

  const handleGetSummary = async () => {
    try {
      const summaryPromise = startSoloAnalysis([id!]).unwrap();
      const analysisPromise = triggerGetAnalysisResults(id!);

      const [{ analysis_result, analysis_status }] = await Promise.all([summaryPromise, analysisPromise]);

      if (analysis_status === "completed") {
        setSummary(analysis_result);
        
      } else {
        message.warning("Анализ подготавливается, подождите");
      }
    } catch {
      message.error("Ошибка при получении данных");
    }
  };

  useEffect(() => {
    const checkAnalysisResults = async () => {
      try {
        const initialResults = await triggerGetAnalysisResults(id!).unwrap();
        //@ts-ignore
        if (initialResults && initialResults.length > 0 && !initialResults[0].msg) {
          handleGetSummary();
        }
      } catch {
        console.log()
      }
    };

    checkAnalysisResults();
  }, [id, triggerGetAnalysisResults]);

  useEffect(() => {
    if (analysisResults && analysisResults.length > 0) {
      setCriteriaData(analysisResults[0].criteria_scores);
    }
  }, [analysisResults]);

  const chartData = criteriaData
    ? {
        labels: Object.keys(criteriaData),
        datasets: [
          {
            label: "Оценка по критериям",
            data: Object.values(criteriaData),
            backgroundColor: "rgba(90, 155, 213, 0.5)",
            borderColor: "#5A9BD5",
            borderWidth: 1,
          },
        ],
      }
    : null;

  const chartOptions = {
    maintainAspectRatio: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          color: "#FFFFFF",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
      x: {
        ticks: {
          color: "#FFFFFF",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#FFFFFF",
        },
      },
    },
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
          <Title level={2} style={{ color: "#FFFFFF" }}>Профиль сотрудника: {id}</Title>
        </Card>

        <Card
          title={
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#FFFFFF" }}>Сводка</span>
              {!summary && (
                <Button
                  type="primary"
                  onClick={handleGetSummary}
                  loading={isSummaryLoading || isAnalysisLoading}
                  style={{
                    color: "#FFFFFF",
                    backgroundColor: "#333",
                    borderColor: "#F1F1F1",
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderRadius: "4px",
                    boxShadow: "none"
                  }}
                >
                  Получить сводку
                </Button>
              )}
            </div>
          }
          bordered={false}
          style={{
            marginBottom: "20px",
            backgroundColor: "#2C2C2C",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          {summary ? (
            <Text style={{ color: "#FFFFFF", whiteSpace: "pre-line" }}>{summary}</Text>
          ) : (
            <Text style={{ color: "#FFFFFF" }}>Запросите анализ для сводки</Text>
          )}
        </Card>

        <Card title={<span style={{ color: "#FFFFFF" }}>Оценка по критериям</span>} bordered={false} style={{ backgroundColor: "#2C2C2C", marginBottom: "20px" }}>
          {isAnalysisLoading ? (
            <Spin />
          ) : chartData ? (
            <Bar data={chartData} options={chartOptions} key={JSON.stringify(chartData)} />
          ) : (
            <Text style={{ color: "#FFFFFF" }}>Запросите анализ для графика</Text>
          )}
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
