import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
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
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h6"
            component="span"
            onClick={() => navigate("/")}
            sx={{
              color: "inherit",
              fontWeight: "bold",
              cursor: "pointer",
              "&:hover": {
                opacity: 0.9,
              },
            }}
          >
            Miel
          </Typography>
        </Box>
        {/*<Button
          color="inherit"
          onClick={() => navigate("/login")}
          sx={{
            fontWeight: 500,
            textTransform: "none",
            fontSize: "1rem",
          }}
        >
          ログイン
        </Button>*/}
      </Toolbar>
    </AppBar>
  );
};

export default HomeHeader;
