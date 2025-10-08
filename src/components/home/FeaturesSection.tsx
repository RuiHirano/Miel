import BarChartIcon from "@mui/icons-material/BarChart";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {
  alpha,
  Box,
  Container,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useRef, useEffect } from "react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  demoVideo?: string;
}

const FeaturesSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Intersection Observer for auto-play videos on scroll
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              video.play().catch(() => {
                // Handle autoplay policy restrictions
                console.log("Autoplay prevented for video", index);
              });
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(video);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const features: Feature[] = [
    {
      icon: <BarChartIcon sx={{ fontSize: 32 }} />,
      title: "美しいデータ可視化",
      description:
        "サンキーダイアグラム、チャート、グラフで収支を直感的に表示。複雑な家計データも一目で理解できます。",
      gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
      demoVideo: "/src/assets/miel-demo-sample.mp4",
    },
    {
      icon: <LightbulbIcon sx={{ fontSize: 32 }} />,
      title: "シンプルだからわかりやすい",
      description:
        "直感的なUIで誰でも簡単に使えます。複雑な機能をシンプルに整理し、ストレスフリーな家計管理を実現。",
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      demoVideo: "/src/assets/miel-demo-sample.mp4",
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 32 }} />,
      title: "インテリジェント分析",
      description:
        "AIが過去のデータを分析し、支出パターンや節約のチャンスを自動で発見。賢い家計管理をサポートします。",
      gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
      demoVideo: "/src/assets/miel-demo-sample.mp4",
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
                fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
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
                fontSize: { xs: "1rem", md: "1.25rem" },
              }}
            >
              シンプルかつ美しいデザインで、家計管理の常識を変える
            </Typography>
          </Stack>

          <Stack spacing={6}>
            {features.map((feature, index) => (
              <Stack
                key={index}
                direction={isMobile ? "column" : "row"}
                spacing={6}
                alignItems="center"
                sx={{
                  p: { xs: 3, md: 5 },
                  borderRadius: 3,
                  background: "white",
                  border: `1px solid ${alpha("#e2e8f0", 0.6)}`,
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
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
                    width: 4,
                    height: "100%",
                    background: feature.gradient,
                    opacity: 0.7,
                    transition: "opacity 0.3s ease",
                  },
                }}
              >
                {/* Left side - Feature content */}
                <Box flex={1}>
                  <Stack spacing={3}>
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
                      variant="h4"
                      fontWeight={600}
                      color="text.primary"
                      sx={{
                        letterSpacing: "-0.01em",
                        lineHeight: 1.3,
                        fontSize: { xs: "1.5rem", md: "2rem" },
                      }}
                    >
                      {feature.title}
                    </Typography>

                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{
                        lineHeight: 1.8,
                        fontSize: { xs: "0.95rem", md: "1.1rem" },
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </Stack>
                </Box>

                {/* Right side - Demo Video */}
                <Box
                  flex={1}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: { xs: 200, md: 250 },
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      maxWidth: { xs: 350, md: 450 },
                      height: { xs: 200, md: 250 },
                      borderRadius: 2,
                      overflow: "hidden",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                      border: `1px solid ${alpha("#e2e8f0", 0.8)}`,
                    }}
                  >
                    {feature.demoVideo && (
                      <video
                        ref={(el) => {
                          videoRefs.current[index] = el;
                        }}
                        muted
                        loop
                        playsInline
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          backgroundColor: "#f8fafc",
                        }}
                      >
                        <source src={feature.demoVideo} type="video/mp4" />
                        お使いのブラウザは動画をサポートしていません。
                      </video>
                    )}
                  </Box>
                </Box>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
