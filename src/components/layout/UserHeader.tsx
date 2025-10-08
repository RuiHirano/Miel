import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Button, 
  IconButton, 
  Menu, 
  MenuItem, 
  useMediaQuery, 
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";
import { Menu as MenuIcon, Logout as LogoutIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { signOut } from "aws-amplify/auth";
import { useState } from "react";
import OrganizationSelector from "../common/OrganizationSelector";
import { useDemoMode } from "../../contexts/DemoModeContext";

const UserHeader = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { isDemo } = useDemoMode();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
    handleMenuClose();
  };

  const handleSignOut = async () => {
    try {
      if (!isDemo) {
        await signOut();
      }
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
    } finally {
      setShowLogoutDialog(false);
    }
  };

  return (
    <>
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

          {/* Organization Selector - Always visible */}
          <OrganizationSelector variant="dark" />

          {/* Desktop Layout - Logout Button */}
          {!isMobile && (
            <Button
              color="inherit"
              onClick={handleLogoutClick}
              sx={{
                fontWeight: 500,
                textTransform: "none",
                fontSize: "1rem",
                ml: 2,
              }}
            >
              ログアウト
            </Button>
          )}

          {/* Mobile Layout - Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              onClick={handleMenuOpen}
              sx={{ ml: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleLogoutClick}>
          <LogoutIcon sx={{ mr: 1 }} />
          ログアウト
        </MenuItem>
      </Menu>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">
          ログアウトしますか？
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            {isDemo 
              ? "デモセッションを終了してホームページに戻ります。"
              : "現在のセッションを終了してホームページに戻ります。"
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowLogoutDialog(false)}>
            キャンセル
          </Button>
          <Button 
            onClick={handleSignOut} 
            variant="contained" 
            autoFocus
            sx={{ color: "white" }}
          >
            ログアウト
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserHeader;
