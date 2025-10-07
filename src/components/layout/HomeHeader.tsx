import { AppBar, Toolbar, Typography } from "@mui/material";

const HomeHeader = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        boxShadow: 2,
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            color: "inherit",
            fontWeight: "bold",
          }}
        >
          Miel
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default HomeHeader;