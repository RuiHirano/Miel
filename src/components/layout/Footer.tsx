import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "background.paper",
        padding: 2,
        borderTop: 1,
        borderColor: "divider",
        marginTop: "auto",
        textAlign: "center",
        boxShadow: 1,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        &copy; 2024 Miel. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
