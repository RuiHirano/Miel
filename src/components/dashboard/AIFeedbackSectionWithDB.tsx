import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  useTheme,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Psychology as PsychologyIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Lightbulb as LightbulbIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SectionContainer from "../common/SectionContainer";
import { AIFeedback, FeedbackService } from "../../core/database";
import { useDatabase } from "../../hooks/useDatabase";

const AIFeedbackSectionWithDB = () => {
  const theme = useTheme();
  const dbState = useDatabase();
  const [feedbacks, setFeedbacks] = useState<AIFeedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFeedbacks = async () => {
      if (!dbState.isReady) return;

      try {
        setLoading(true);
        const feedbackService = new FeedbackService();
        const dashboardFeedbacks = await feedbackService.getDashboardFeedbacks();
        
        const allFeedbacks = [
          ...dashboardFeedbacks.highPriority,
          ...dashboardFeedbacks.actionable,
          ...dashboardFeedbacks.recent
        ];
        
        const uniqueFeedbacks = allFeedbacks.filter(
          (feedback, index, self) => self.findIndex(f => f.id === feedback.id) === index
        );
        
        const sortedFeedbacks = uniqueFeedbacks.sort((a, b) => {
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        });

        setFeedbacks(sortedFeedbacks);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load feedbacks');
      } finally {
        setLoading(false);
      }
    };

    loadFeedbacks();
  }, [dbState.isReady]);

  const getTypeIcon = (type: AIFeedback["type"]) => {
    switch (type) {
      case "warning":
        return <WarningIcon sx={{ fontSize: 20 }} />;
      case "achievement":
        return <CheckCircleIcon sx={{ fontSize: 20 }} />;
      case "suggestion":
        return <LightbulbIcon sx={{ fontSize: 20 }} />;
      case "insight":
        return <TrendingUpIcon sx={{ fontSize: 20 }} />;
      default:
        return <PsychologyIcon sx={{ fontSize: 20 }} />;
    }
  };

  const getTypeColor = (type: AIFeedback["type"]) => {
    switch (type) {
      case "warning":
        return theme.palette.chart?.expense || "#DC2626";
      case "achievement":
        return theme.palette.chart?.income || "#2AA693";
      case "suggestion":
        return "#3B82F6";
      case "insight":
        return theme.palette.chart?.neutral || "#4B5563";
      default:
        return theme.palette.chart?.neutral || "#4B5563";
    }
  };

  const getPriorityColor = (priority: AIFeedback["priority"]) => {
    switch (priority) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "info";
      default:
        return "default";
    }
  };

  const getTypeLabel = (type: AIFeedback["type"]) => {
    switch (type) {
      case "warning":
        return "注意";
      case "achievement":
        return "達成";
      case "suggestion":
        return "提案";
      case "insight":
        return "分析";
      default:
        return "情報";
    }
  };

  const getPriorityLabel = (priority: AIFeedback["priority"]) => {
    switch (priority) {
      case "high":
        return "重要";
      case "medium":
        return "中";
      case "low":
        return "低";
      default:
        return "通常";
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ja-JP", {
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  };

  if (dbState.error || error) {
    return (
      <SectionContainer
        title="AIからのフィードバック"
        description="お客様の収支データを分析し、パーソナライズされたアドバイスを提供します"
        icon={<PsychologyIcon />}
      >
        <Alert severity="error">
          {dbState.error || error}
        </Alert>
      </SectionContainer>
    );
  }

  if (dbState.isInitializing || loading) {
    return (
      <SectionContainer
        title="AIからのフィードバック"
        description="お客様の収支データを分析し、パーソナライズされたアドバイスを提供します"
        icon={<PsychologyIcon />}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer
      title="AIからのフィードバック"
      description="お客様の収支データを分析し、パーソナライズされたアドバイスを提供します"
      icon={<PsychologyIcon />}
      expandable={true}
      maxHeight={500}
    >
      <Stack spacing={2}>
        {feedbacks.length === 0 ? (
          <Typography color="text.secondary" textAlign="center" py={4}>
            フィードバックはありません
          </Typography>
        ) : (
          feedbacks.map((feedback) => (
            <Card
              key={feedback.id}
              variant="outlined"
              sx={{
                borderLeft: `4px solid ${getTypeColor(feedback.type)}`,
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  boxShadow: 2,
                  transform: "translateY(-1px)",
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box sx={{ color: getTypeColor(feedback.type) }}>
                      {getTypeIcon(feedback.type)}
                    </Box>
                    <Typography variant="h6" component="h3" fontWeight="medium">
                      {feedback.title}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Chip
                      label={getTypeLabel(feedback.type)}
                      size="small"
                      sx={{
                        backgroundColor: `${getTypeColor(feedback.type)}15`,
                        color: getTypeColor(feedback.type),
                        border: "none",
                      }}
                    />
                    <Chip
                      label={getPriorityLabel(feedback.priority)}
                      size="small"
                      color={getPriorityColor(feedback.priority)}
                      variant="outlined"
                    />
                  </Box>
                </Box>

                <Box
                  sx={{
                    mb: 2,
                    "& h1, & h2, & h3": {
                      fontSize: "1rem",
                      fontWeight: "medium",
                      margin: "12px 0 8px 0",
                      color: "text.primary",
                    },
                    "& p": {
                      fontSize: "0.875rem",
                      lineHeight: 1.6,
                      margin: "8px 0",
                      color: "text.secondary",
                    },
                    "& ul, & ol": {
                      fontSize: "0.875rem",
                      paddingLeft: "20px",
                      margin: "8px 0",
                      color: "text.secondary",
                    },
                    "& li": {
                      margin: "4px 0",
                    },
                    "& blockquote": {
                      borderLeft: `3px solid ${getTypeColor(feedback.type)}`,
                      paddingLeft: "12px",
                      margin: "12px 0",
                      fontStyle: "italic",
                      backgroundColor: `${getTypeColor(feedback.type)}08`,
                      borderRadius: "4px",
                      padding: "8px 12px",
                    },
                    "& table": {
                      borderCollapse: "collapse",
                      width: "100%",
                      fontSize: "0.875rem",
                      margin: "12px 0",
                    },
                    "& th, & td": {
                      border: "1px solid #e0e0e0",
                      padding: "8px",
                      textAlign: "left",
                    },
                    "& th": {
                      backgroundColor: "#f5f5f5",
                      fontWeight: "medium",
                    },
                    "& strong": {
                      fontWeight: "medium",
                      color: "text.primary",
                    },
                    "& code": {
                      backgroundColor: "#f5f5f5",
                      padding: "2px 4px",
                      borderRadius: "3px",
                      fontSize: "0.8rem",
                    },
                  }}
                >
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {feedback.message}
                  </ReactMarkdown>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(feedback.createdAt)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))
        )}
      </Stack>
    </SectionContainer>
  );
};

export default AIFeedbackSectionWithDB;