import {
  AccountBalance as AccountIcon,
  Psychology as AIIcon,
  Category as CategoryIcon,
  CheckCircle as CheckIcon,
  PlayArrow as PlayIcon,
  TrendingUp as TrendingIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDemoMode } from "../contexts/DemoModeContext";

const Demo: React.FC = () => {
  const navigate = useNavigate();
  const { isDemo, setDemoMode } = useDemoMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleStartDemo = () => {
    if (!isDemo) {
      setDemoMode(true);
    }
    // Navigate to dashboard with default organization slug for demo
    navigate("/hirano-family/dashboard");
  };

  const features = [
    {
      icon: <AccountIcon />,
      title: "収支管理",
      description: "収入・支出を簡単に記録し、カテゴリ別に管理",
    },
    {
      icon: <TrendingIcon />,
      title: "トレンド分析",
      description: "月別の収支推移をグラフで可視化",
    },
    {
      icon: <AIIcon />,
      title: "AIフィードバック",
      description: "AIが収支パターンを分析し、改善提案を提供",
    },
    {
      icon: <CategoryIcon />,
      title: "カテゴリ管理",
      description: "支出カテゴリを自由にカスタマイズ",
    },
  ];

  const demoData = [
    "平野家の家計簿（サンプル組織）",
    "2024年1月の収支データ",
    "食費、交通費、家賃などのカテゴリ",
    "AIによる支出分析と改善提案",
    "月次トレンドグラフ",
  ];

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Stack spacing={4}>
        {/* Header */}
        <Box textAlign="center">
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            fontWeight="bold"
            sx={{ fontSize: isMobile ? "2rem" : "3rem" }}
          >
            Mielをデモで体験
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            paragraph
            sx={{ fontSize: isMobile ? "1rem" : "1.25rem" }}
          >
            実際のデータを使わずに、すべての機能を自由にお試しいただけます
          </Typography>
        </Box>

        {/* Features */}
        <Paper elevation={1} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom fontWeight="medium" mb={3}>
            利用可能な機能
          </Typography>
          <List>
            {features.map((feature, index) => (
              <ListItem key={index} sx={{ py: 2 }}>
                <ListItemIcon sx={{ color: "primary.main" }}>
                  {feature.icon}
                </ListItemIcon>
                <ListItemText
                  primary={feature.title}
                  secondary={feature.description}
                  primaryTypographyProps={{ fontWeight: "medium" }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Demo Data */}
        <Paper elevation={1} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom fontWeight="medium" mb={3}>
            サンプルデータ
          </Typography>
          <List>
            {demoData.map((item, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <CheckIcon color="success" />
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* CTA */}
        <Box textAlign="center">
          <Stack
            direction={isMobile ? "column" : "row"}
            spacing={2}
            justifyContent="center"
            alignItems={isMobile ? "stretch" : "center"}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayIcon />}
              onClick={handleStartDemo}
              sx={{
                px: 4,
                py: 1.5,
                color: "white",
              }}
            >
              デモを開始
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/")}
              sx={{ px: 4, py: 1.5 }}
            >
              ホームに戻る
            </Button>
          </Stack>
        </Box>

        {/* Notice */}
        <Box textAlign="center">
          <Typography variant="body2" color="text.secondary">
            ※ デモモードで作成したデータは保存されません
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ※ いつでも実際のデータモードに切り替え可能です
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
};

export default Demo;
