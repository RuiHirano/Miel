import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import UserHeader from "./UserHeader";
import Footer from "./Footer";
import { DemoModeBanner, DemoModeIndicator } from "../common/DemoModeBanner";

const UserLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "background.subtle",
      }}
    >
      <UserHeader />
      <DemoModeBanner />
      <Container component="main" maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
        <Outlet />
      </Container>
      <Footer />
      <DemoModeIndicator />
    </Box>
  );
};

export default UserLayout;
