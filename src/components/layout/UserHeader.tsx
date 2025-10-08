import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import OrganizationSelector from "../common/OrganizationSelector";

const UserHeader = () => {
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
      </Toolbar>
    </AppBar>
  );
};

export default UserHeader;
