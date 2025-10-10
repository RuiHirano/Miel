import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import HomeHeader from "./HomeHeader";

const HomeLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "background.subtle",
      }}
    >
      <HomeHeader />
      <Box component="main" maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default HomeLayout;
