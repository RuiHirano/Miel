import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomeHeader = () => {
  const navigate = useNavigate();

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
        <Button
          color="inherit"
          onClick={() => navigate("/login")}
          sx={{
            fontWeight: 500,
            textTransform: "none",
            fontSize: "1rem",
          }}
        >
          ログイン
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default HomeHeader;