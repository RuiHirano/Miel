import { AppBar, Toolbar, Typography } from "@mui/material";

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
      </Toolbar>
    </AppBar>
  );
};

export default Header;
