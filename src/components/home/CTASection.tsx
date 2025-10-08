import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  alpha,
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const benefits = [
    "完全無料で全機能利用可能",
    "クレジットカード登録不要",
    "30秒でアカウント作成完了",
  ];

  return (
    <Box
      sx={{
        position: "relative",
        background: "linear-gradient(135deg, #1a202c 0%, #2d3748 100%)",
        color: "white",
        py: { xs: 12, md: 20 },
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 25% 25%, ${alpha(
            "#667eea",
            0.1
          )} 0%, transparent 50%),
                      radial-gradient(circle at 75% 75%, ${alpha(
                        "#764ba2",
                        0.1
                      )} 0%, transparent 50%)`,
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Stack spacing={8} alignItems="center" textAlign="center">
          <Stack spacing={4} alignItems="center">
            <Typography
              variant="h2"
              component="h2"
              fontWeight={700}
              sx={{
                maxWidth: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                background: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
              }}
            >
              あなたの家計管理を
              <br />
              次のレベルへ
            </Typography>

            <Typography
              variant="h5"
              sx={{
                opacity: 0.9,
                maxWidth: 600,
                lineHeight: 1.6,
                fontWeight: 400,
                fontSize: { xs: "1rem", md: "1.25rem" },
              }}
            >
              今すぐMielを始めて、お金の流れを美しく可視化し、
              スマートな家計判断を手に入れましょう
            </Typography>
          </Stack>

          {/* Benefits */}
          <Stack
            direction={isMobile ? "column" : "row"}
            spacing={isMobile ? 2 : 4}
            sx={{ 
              width: "100%", 
              maxWidth: 800,
              alignItems: isMobile ? "center" : "stretch"
            }}
          >
            {benefits.map((benefit, index) => (
              <Stack
                key={index}
                direction="row"
                spacing={1.5}
                alignItems="center"
                sx={{ 
                  flex: 1,
                  justifyContent: isMobile ? "center" : "flex-start"
                }}
              >
                <CheckCircleIcon
                  sx={{
                    color: "#10b981",
                    fontSize: 20,
                    flexShrink: 0,
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    opacity: 0.9,
                    textAlign: "center",
                    fontSize: { xs: "0.875rem", md: "0.95rem" },
                  }}
                >
                  {benefit}
                </Typography>
              </Stack>
            ))}
          </Stack>

          <Stack
            direction={isMobile ? "column" : "row"}
            spacing={3}
            sx={{ mt: 6 }}
          >
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate("/demo")}
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                fontWeight: 600,
                px: 6,
                py: 2.5,
                borderRadius: 2,
                fontSize: { xs: "1rem", md: "1.2rem" },
                textTransform: "none",
                boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
                  transform: "translateY(-3px)",
                  boxShadow: "0 12px 40px rgba(102, 126, 234, 0.4)",
                },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              今すぐ無料で始める
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/login")}
              sx={{
                borderColor: alpha("#ffffff", 0.3),
                color: "white",
                fontWeight: 500,
                px: 6,
                py: 2.5,
                borderRadius: 2,
                fontSize: { xs: "1rem", md: "1.2rem" },
                textTransform: "none",
                backdropFilter: "blur(10px)",
                "&:hover": {
                  borderColor: alpha("#ffffff", 0.6),
                  bgcolor: alpha("#ffffff", 0.1),
                  transform: "translateY(-3px)",
                },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              ログイン
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default CTASection;
