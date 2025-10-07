import {
  Box,
  Typography,
  Button,
  Container,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        py: { xs: 8, md: 12 },
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Geometric Decorations */}
      <Box
        sx={{
          position: "absolute",
          top: "15%",
          right: "20%",
          width: 120,
          height: 120,
          borderRadius: "50%",
          bgcolor: "#10b981",
          opacity: 0.6,
          display: { xs: "none", md: "block" },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "70%",
          right: "15%",
          width: 80,
          height: 80,
          borderRadius: "50%",
          bgcolor: "#f59e0b",
          opacity: 0.7,
          display: { xs: "none", md: "block" },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          right: "35%",
          width: 0,
          height: 0,
          borderLeft: "40px solid transparent",
          borderRight: "40px solid transparent",
          borderBottom: "70px solid #06b6d4",
          opacity: 0.5,
          display: { xs: "none", md: "block" },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "25%",
          right: "45%",
          width: 60,
          height: 60,
          borderRadius: "50%",
          bgcolor: "#8b5cf6",
          opacity: 0.4,
          display: { xs: "none", md: "block" },
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={6}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Left Content */}
          <Box flex={1} sx={{ maxWidth: { md: 600 } }}>
            <Stack spacing={4} alignItems={isMobile ? "center" : "flex-start"}>
              <Typography
                variant="body1"
                sx={{
                  color: "#64748b",
                  fontWeight: 500,
                  textAlign: isMobile ? "center" : "left",
                }}
              >
                家計管理の新しいスタンダード
              </Typography>

              <Typography
                variant="h2"
                component="h1"
                fontWeight={700}
                textAlign={isMobile ? "center" : "left"}
                sx={{
                  color: "#1e293b",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                }}
              >
                正しい家計管理が
                <br />
                豊かな暮らしを加速する
              </Typography>

              <Typography
                variant="h6"
                textAlign={isMobile ? "center" : "left"}
                sx={{
                  color: "#64748b",
                  lineHeight: 1.8,
                  fontWeight: 400,
                  maxWidth: 480,
                }}
              >
                収支管理、支出分析、資産運用まで。
                <br />
                Mielは、あらゆる家計管理を
                <br />
                シンプルで美しいUIで実現します。
              </Typography>

              <Box sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/dashboard")}
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    color: "white",
                    fontWeight: 600,
                    px: 5,
                    py: 2,
                    borderRadius: "50px",
                    fontSize: "1.1rem",
                    textTransform: "none",
                    boxShadow: `0 4px 20px ${theme.palette.primary.main}40`,
                    "&:hover": {
                      bgcolor: theme.palette.primary.dark,
                      transform: "translateY(-2px)",
                      boxShadow: `0 8px 30px ${theme.palette.primary.main}60`,
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  無料ダウンロード
                </Button>
              </Box>
            </Stack>
          </Box>

          {/* Right Visual */}
          <Box
            flex={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              mt: isMobile ? 6 : 0,
            }}
          >
            {/* Main circular image placeholder */}
            <Box
              sx={{
                width: { xs: 300, md: 400 },
                height: { xs: 300, md: 400 },
                borderRadius: "50%",
                background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
                border: "3px solid #10b981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Stack alignItems="center" spacing={2}>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: "50%",
                    bgcolor: "#10b981",
                  }}
                >
                  <AccountBalanceWalletIcon
                    sx={{
                      fontSize: 48,
                      color: "white",
                    }}
                  />
                </Box>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  color="#059669"
                  textAlign="center"
                >
                  スマート
                  <br />
                  家計管理
                </Typography>
              </Stack>

              {/* Floating elements */}
              <Box
                sx={{
                  position: "absolute",
                  top: "20%",
                  left: "-10%",
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  bgcolor: "#06b6d4",
                  opacity: 0.8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 20px rgba(6, 182, 212, 0.3)",
                }}
              >
                <Typography variant="body2" color="white" fontWeight={600}>
                  ¥
                </Typography>
              </Box>

              <Box
                sx={{
                  position: "absolute",
                  bottom: "25%",
                  right: "-5%",
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  bgcolor: "#f59e0b",
                  opacity: 0.9,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 20px rgba(245, 158, 11, 0.3)",
                }}
              >
                <Typography variant="body2" color="white" fontWeight={600}>
                  %
                </Typography>
              </Box>
            </Box>

            {/* Background decorative shapes */}
            <Box
              sx={{
                position: "absolute",
                top: "10%",
                left: "10%",
                width: 80,
                height: 80,
                background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
                opacity: 0.6,
                transform: "rotate(45deg)",
                display: { xs: "none", md: "block" },
              }}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default HeroSection;
