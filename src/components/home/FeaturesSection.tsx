import BarChartIcon from "@mui/icons-material/BarChart";
import MobileScreenShareIcon from "@mui/icons-material/MobileScreenShare";
import SecurityIcon from "@mui/icons-material/Security";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { alpha, Box, Container, Grid, Stack, Typography } from "@mui/material";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

const FeaturesSection = () => {
  const features: Feature[] = [
    {
      icon: <BarChartIcon sx={{ fontSize: 32 }} />,
      title: "美しいデータ可視化",
      description:
        "サンキーダイアグラム、チャート、グラフで収支を直感的に表示。複雑な財務データも一目で理解できます。",
      gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 32 }} />,
      title: "インテリジェント分析",
      description:
        "AI が過去のデータを分析し、支出パターンや節約のチャンスを自動で発見。賢い家計管理をサポートします。",
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    },
    {
      icon: <MobileScreenShareIcon sx={{ fontSize: 32 }} />,
      title: "どこでもアクセス",
      description:
        "レスポンシブデザインでスマートフォン、タブレット、デスクトップのすべてで最適な体験を提供します。",
      gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 32 }} />,
      title: "エンタープライズ級セキュリティ",
      description:
        "銀行レベルの暗号化とセキュリティプロトコルで、あなたの大切な財務情報を完全に保護します。",
      gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 12, md: 16 },
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 30% 20%, ${alpha(
            "#667eea",
            0.03
          )} 0%, transparent 50%),
                      radial-gradient(circle at 70% 80%, ${alpha(
                        "#764ba2",
                        0.03
                      )} 0%, transparent 50%)`,
          pointerEvents: "none",
        },
      }}
    >
      {/* Decorative Background Elements */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: 100,
          height: 100,
          borderRadius: "50%",
          bgcolor: "#10b981",
          opacity: 0.4,
          display: { xs: "none", md: "block" },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "15%",
          right: "8%",
          width: 80,
          height: 80,
          borderRadius: "50%",
          bgcolor: "#f59e0b",
          opacity: 0.5,
          display: { xs: "none", md: "block" },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "20%",
          left: "10%",
          width: 0,
          height: 0,
          borderLeft: "35px solid transparent",
          borderRight: "35px solid transparent",
          borderBottom: "60px solid #06b6d4",
          opacity: 0.4,
          display: { xs: "none", md: "block" },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          right: "12%",
          width: 70,
          height: 70,
          borderRadius: "50%",
          bgcolor: "#8b5cf6",
          opacity: 0.3,
          display: { xs: "none", md: "block" },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "2%",
          width: 50,
          height: 50,
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          opacity: 0.5,
          transform: "rotate(45deg)",
          display: { xs: "none", md: "block" },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "70%",
          right: "5%",
          width: 40,
          height: 40,
          background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
          opacity: 0.6,
          transform: "rotate(45deg)",
          display: { xs: "none", md: "block" },
        }}
      />
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
              Mielが選ばれる理由
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
              シンプルかつ美しいデザインで、家計管理の常識を変える
            </Typography>
          </Stack>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid size={{ xs: 12, md: 6 }} key={index}>
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
                        transition:
                          "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
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
