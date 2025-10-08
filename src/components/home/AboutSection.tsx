import {
  Box,
  Typography,
  Container,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const AboutSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        position: "relative",
        background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
        py: { xs: 8, md: 12 },
        overflow: "hidden",
      }}
    >
      {/* Background Decorations */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: 100,
          height: 100,
          borderRadius: "50%",
          bgcolor: "#06b6d4",
          opacity: 0.3,
          display: { xs: "none", md: "block" },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "15%",
          right: "10%",
          width: 150,
          height: 150,
          borderRadius: "50%",
          bgcolor: "#0891b2",
          opacity: 0.2,
          display: { xs: "none", md: "block" },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          right: "5%",
          width: 0,
          height: 0,
          borderLeft: "30px solid transparent",
          borderRight: "30px solid transparent",
          borderBottom: "50px solid #06b6d4",
          opacity: 0.4,
          display: { xs: "none", md: "block" },
        }}
      />

      {/* Wave decoration */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "40%",
          height: "60%",
          background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
          opacity: 0.1,
          borderTopLeftRadius: "50%",
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
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "#06b6d4",
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    color: "#06b6d4",
                    fontWeight: 600,
                    textAlign: isMobile ? "center" : "left",
                  }}
                >
                  What's Miel?
                </Typography>
              </Box>

              <Typography
                variant="h2"
                component="h2"
                fontWeight={700}
                textAlign={isMobile ? "center" : "left"}
                sx={{
                  color: "#1e293b",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                  fontSize: { xs: "2.2rem", md: "3rem" },
                }}
              >
                家計データを軸に
                <br />
                豊かな暮らしを実現します
              </Typography>

              <Typography
                variant="h6"
                textAlign={isMobile ? "center" : "left"}
                sx={{
                  color: "#64748b",
                  lineHeight: 1.8,
                  fontWeight: 400,
                  maxWidth: 500,
                }}
              >
                Mielは家計データの活用支援を通して、
                <br />
                お金に困らない
                <br />
                ライフスタイルを提供しています。
              </Typography>
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
            {/* Left Circle - Data Visualization */}
            <Box
              sx={{
                position: "relative",
                mr: { xs: 2, md: 4 },
              }}
            >
              <Box
                sx={{
                  width: { xs: 120, md: 150 },
                  height: { xs: 120, md: 150 },
                  borderRadius: "50%",
                  bgcolor: "white",
                  border: "3px solid #06b6d4",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 10px 30px rgba(6, 182, 212, 0.2)",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <BarChartIcon
                  sx={{
                    fontSize: { xs: 32, md: 40 },
                    color: "#06b6d4",
                    mb: 1,
                  }}
                />
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color="#06b6d4"
                  textAlign="center"
                  sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                >
                  データ
                  <br />
                  可視化
                </Typography>
              </Box>
            </Box>

            {/* Right Circle - Financial Analysis */}
            <Box
              sx={{
                position: "relative",
                ml: { xs: 2, md: 4 },
              }}
            >
              <Box
                sx={{
                  width: { xs: 120, md: 150 },
                  height: { xs: 120, md: 150 },
                  borderRadius: "50%",
                  bgcolor: "white",
                  border: "3px solid #0891b2",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 10px 30px rgba(8, 145, 178, 0.2)",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <TrendingUpIcon
                  sx={{
                    fontSize: { xs: 32, md: 40 },
                    color: "#0891b2",
                    mb: 1,
                  }}
                />
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color="#0891b2"
                  textAlign="center"
                  sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                >
                  資産
                  <br />
                  分析
                </Typography>
              </Box>
            </Box>

            {/* Connecting line */}
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: { xs: 80, md: 100 },
                height: 2,
                bgcolor: "#06b6d4",
                opacity: 0.3,
                zIndex: 1,
              }}
            />

            {/* Floating decorative elements */}
            <Box
              sx={{
                position: "absolute",
                top: "10%",
                left: "-10%",
                width: 50,
                height: 50,
                borderRadius: "50%",
                bgcolor: "#10b981",
                opacity: 0.7,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 20px rgba(16, 185, 129, 0.3)",
              }}
            ></Box>

            <Box
              sx={{
                position: "absolute",
                bottom: "20%",
                right: "-10%",
                width: 45,
                height: 45,
                borderRadius: "50%",
                bgcolor: "#f59e0b",
                opacity: 0.8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 20px rgba(245, 158, 11, 0.3)",
              }}
            ></Box>

            {/* Background decorative elements */}
            <Box
              sx={{
                position: "absolute",
                top: "-20%",
                left: "20%",
                width: 40,
                height: 40,
                borderRadius: "50%",
                bgcolor: "#8b5cf6",
                opacity: 0.4,
                display: { xs: "none", md: "block" },
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: "-10%",
                right: "10%",
                width: 30,
                height: 30,
                borderRadius: "50%",
                bgcolor: "#06b6d4",
                opacity: 0.5,
                display: { xs: "none", md: "block" },
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: "60%",
                left: "10%",
                width: 0,
                height: 0,
                borderLeft: "20px solid transparent",
                borderRight: "20px solid transparent",
                borderBottom: "35px solid #10b981",
                opacity: 0.4,
                display: { xs: "none", md: "block" },
              }}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default AboutSection;
