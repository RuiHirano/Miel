import {
  Box,
  Typography,
  Container,
  Stack,
  alpha,
  Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useNavigate } from "react-router-dom";

const PricingSection = () => {
  const navigate = useNavigate();
  const features = [
    "美しいデータ可視化",
    "シンプルで使いやすいUI",
    "AIによる分析機能",
    "無制限のトランザクション",
    "クラウド同期",
    "優先サポート",
  ];

  return (
    <Box
      sx={{
        py: { xs: 12, md: 16 },
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 70% 30%, ${alpha(
            "#06b6d4",
            0.03
          )} 0%, transparent 50%),
                      radial-gradient(circle at 30% 70%, ${alpha(
                        "#10b981",
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
          top: "15%",
          left: "10%",
          width: 80,
          height: 80,
          borderRadius: "50%",
          bgcolor: "#06b6d4",
          opacity: 0.4,
          display: { xs: "none", md: "block" },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          right: "8%",
          width: 60,
          height: 60,
          borderRadius: "50%",
          bgcolor: "#10b981",
          opacity: 0.5,
          display: { xs: "none", md: "block" },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "25%",
          left: "5%",
          width: 0,
          height: 0,
          borderLeft: "30px solid transparent",
          borderRight: "30px solid transparent",
          borderBottom: "50px solid #f59e0b",
          opacity: 0.4,
          display: { xs: "none", md: "block" },
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Stack spacing={8} alignItems="center">
          {/* Header */}
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
              シンプルな料金プラン
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
              すべての機能が使える、わかりやすい月額制
            </Typography>
          </Stack>

          {/* Pricing Card */}
          <Box
            sx={{
              maxWidth: 500,
              width: "100%",
              p: { xs: 4, md: 6 },
              borderRadius: 4,
              background: "white",
              border: `2px solid ${alpha("#06b6d4", 0.2)}`,
              position: "relative",
              overflow: "hidden",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 24px 48px rgba(0, 0, 0, 0.12)",
                borderColor: alpha("#06b6d4", 0.4),
              },
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 6,
                background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
              },
            }}
          >
            <Stack spacing={4}>
              {/* Price */}
              <Stack spacing={2} alignItems="center">
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 12px 32px rgba(6, 182, 212, 0.3)",
                  }}
                >
                  <MonetizationOnIcon sx={{ fontSize: 40, color: "white" }} />
                </Box>

                <Typography
                  variant="h6"
                  fontWeight={600}
                  color="text.primary"
                  sx={{ fontSize: { xs: "1.1rem", md: "1.25rem" } }}
                >
                  スタンダードプラン
                </Typography>

                <Box display="flex" alignItems="baseline" gap={1}>
                  <Typography
                    variant="h2"
                    fontWeight={700}
                    sx={{
                      background:
                        "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontSize: { xs: "3rem", md: "3.5rem" },
                    }}
                  >
                    ¥390
                  </Typography>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    fontWeight={500}
                    sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                  >
                    /月
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                  sx={{
                    fontSize: { xs: "0.875rem", md: "1rem" },
                  }}
                >
                  1日あたり約13円で、すべての機能をご利用いただけます
                </Typography>
              </Stack>

              {/* Features */}
              <Stack spacing={2.5} sx={{ pt: 2 }}>
                {features.map((feature, index) => (
                  <Box
                    key={index}
                    display="flex"
                    alignItems="center"
                    gap={2}
                    sx={{
                      transition: "transform 0.2s ease",
                      "&:hover": {
                        transform: "translateX(4px)",
                      },
                    }}
                  >
                    <CheckCircleIcon
                      sx={{
                        color: "#06b6d4",
                        fontSize: 24,
                      }}
                    />
                    <Typography
                      variant="body1"
                      color="text.primary"
                      fontWeight={500}
                      sx={{ fontSize: { xs: "0.95rem", md: "1.1rem" } }}
                    >
                      {feature}
                    </Typography>
                  </Box>
                ))}
              </Stack>

              {/* CTA Button */}
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/demo")}
                sx={{
                  mt: 2,
                  py: 1.5,
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  fontWeight: 600,
                  borderRadius: 2,
                  background:
                    "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
                  boxShadow: "0 8px 24px rgba(6, 182, 212, 0.3)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #0891b2 0%, #0e7490 100%)",
                    boxShadow: "0 12px 32px rgba(6, 182, 212, 0.4)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                今すぐ始める
              </Button>

              <Typography
                variant="caption"
                color="text.secondary"
                textAlign="center"
                sx={{
                  fontSize: { xs: "0.75rem", md: "0.875rem" },
                  pt: 1,
                }}
              >
                いつでもキャンセル可能
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default PricingSection;
