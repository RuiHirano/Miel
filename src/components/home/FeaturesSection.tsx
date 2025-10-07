import {
  Box,
  Typography,
  Container,
  Grid,
  Stack,
  useTheme,
  alpha,
} from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SecurityIcon from "@mui/icons-material/Security";
import MobileScreenShareIcon from "@mui/icons-material/MobileScreenShare";
import PaletteIcon from "@mui/icons-material/Palette";
import FlashOnIcon from "@mui/icons-material/FlashOn";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

const FeaturesSection = () => {
  const theme = useTheme();

  const features: Feature[] = [
    {
      icon: <BarChartIcon sx={{ fontSize: 32 }} />,
      title: "美しいデータ可視化",
      description: "サンキーダイアグラム、チャート、グラフで収支を直感的に表示。複雑な財務データも一目で理解できます。",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 32 }} />,
      title: "インテリジェント分析",
      description: "AI が過去のデータを分析し、支出パターンや節約のチャンスを自動で発見。賢い家計管理をサポートします。",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      icon: <MobileScreenShareIcon sx={{ fontSize: 32 }} />,
      title: "どこでもアクセス",
      description: "レスポンシブデザインでスマートフォン、タブレット、デスクトップのすべてで最適な体験を提供します。",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 32 }} />,
      title: "エンタープライズ級セキュリティ",
      description: "銀行レベルの暗号化とセキュリティプロトコルで、あなたの大切な財務情報を完全に保護します。",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    },
    {
      icon: <PaletteIcon sx={{ fontSize: 32 }} />,
      title: "洗練されたデザイン",
      description: "Apple や Google のデザイン原則に基づいた美しく使いやすいインターフェース。毎日使いたくなるアプリです。",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    },
    {
      icon: <FlashOnIcon sx={{ fontSize: 32 }} />,
      title: "稲妻のような高速性能",
      description: "最新技術で構築された超高速アプリ。大量のデータも瞬時に処理し、ストレスフリーな操作感を実現。",
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    },
  ];

  return (
    <Box 
      sx={{ 
        py: { xs: 12, md: 16 },
        background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 30% 20%, ${alpha("#667eea", 0.03)} 0%, transparent 50%),
                      radial-gradient(circle at 70% 80%, ${alpha("#764ba2", 0.03)} 0%, transparent 50%)`,
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Stack spacing={8} alignItems="center">
          <Stack spacing={3} alignItems="center" textAlign="center">
            <Typography
              variant="h2"
              component="h2"
              fontWeight={700}
              sx={{
                background: "linear-gradient(135deg, #1a202c 0%, #2d3748 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.02em",
              }}
            >
              なぜMielが選ばれるのか
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ 
                maxWidth: 680,
                lineHeight: 1.6,
                fontWeight: 400,
              }}
            >
              革新的な技術と美しいデザインで、
              家計管理の常識を変える6つの理由
            </Typography>
          </Stack>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Box
                  sx={{
                    height: "100%",
                    p: 4,
                    borderRadius: 3,
                    background: "white",
                    border: `1px solid ${alpha("#e2e8f0", 0.6)}`,
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                      "& .feature-icon": {
                        transform: "scale(1.1) rotate(5deg)",
                      },
                      "&::before": {
                        opacity: 1,
                      },
                    },
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: feature.gradient,
                      opacity: 0.7,
                      transition: "opacity 0.3s ease",
                    },
                  }}
                >
                  <Stack spacing={3} height="100%">
                    <Box
                      className="feature-icon"
                      sx={{
                        width: 72,
                        height: 72,
                        borderRadius: 2.5,
                        background: feature.gradient,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    >
                      {feature.icon}
                    </Box>
                    
                    <Typography
                      variant="h5"
                      fontWeight={600}
                      color="text.primary"
                      sx={{ 
                        letterSpacing: "-0.01em",
                        lineHeight: 1.3,
                      }}
                    >
                      {feature.title}
                    </Typography>
                    
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ 
                        flexGrow: 1,
                        lineHeight: 1.7,
                        fontSize: "1rem",
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </Stack>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default FeaturesSection;