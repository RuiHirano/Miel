import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signOut } from "aws-amplify/auth";
import OrganizationSelector from "../common/OrganizationSelector";

const UserHeader = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

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
            onClick={() => navigate("/dashboard")}
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

        {/* Organization Selector - Right side */}
        <OrganizationSelector variant="dark" />
        
        <Button
          color="inherit"
          onClick={handleSignOut}
          sx={{
            fontWeight: 500,
            textTransform: "none",
            fontSize: "1rem",
            ml: 2,
          }}
        >
          ログアウト
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default UserHeader;
