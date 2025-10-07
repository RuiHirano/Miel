import { AppBar, Toolbar, Typography } from "@mui/material";
import OrganizationSelector from "../common/OrganizationSelector";

const UserHeader = () => {
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

        {/* Organization Selector - Right side */}
        <OrganizationSelector variant="dark" />
      </Toolbar>
    </AppBar>
  );
};

export default UserHeader;