import { AppBar, Toolbar, Typography } from "@mui/material";
import OrganizationSelector from "../common/OrganizationSelector";

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "primary.main",
        color: "primary.contrastText",
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

export default Header;
