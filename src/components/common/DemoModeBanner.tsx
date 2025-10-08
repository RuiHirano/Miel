import { ExitToApp as ExitIcon, Info as InfoIcon } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDemoMode } from "../../contexts/DemoModeContext";

export const DemoModeBanner: React.FC = () => {
  const { isDemo, setDemoMode } = useDemoMode();
  const [showExitDialog, setShowExitDialog] = useState(false);

  if (!isDemo) {
    return null;
  }

  const handleExitDemo = () => {
    setShowExitDialog(true);
  };

  const confirmExitDemo = () => {
    setDemoMode(false);
    setShowExitDialog(false);
    // Redirect to demo page and reload to initialize real database
    window.location.href = '/demo';
  };

  return (
    <>
      <Collapse in={true}>
        <Alert
          severity="info"
          icon={<InfoIcon />}
          sx={{
            borderRadius: 0,
            "& .MuiAlert-message": {
              width: "100%",
            },
          }}
        >
          <AlertTitle>デモモードで実行中</AlertTitle>
          <Typography variant="body2">
            現在、サンプルデータを使用しています。実際のデータは保存されません。
            すべての機能を自由にお試しください。
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
            <Button
              size="small"
              color="inherit"
              startIcon={<ExitIcon />}
              onClick={handleExitDemo}
              sx={{ whiteSpace: "nowrap" }}
            >
              デモを終了する
            </Button>
          </Box>
        </Alert>
      </Collapse>

      <Dialog
        open={showExitDialog}
        onClose={() => setShowExitDialog(false)}
        aria-labelledby="exit-demo-dialog-title"
        aria-describedby="exit-demo-dialog-description"
      >
        <DialogTitle id="exit-demo-dialog-title">
          デモモードを終了しますか？
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="exit-demo-dialog-description">
            デモモードを終了すると、実際のデータを使用するモードに切り替わります。
            デモモードで作成したデータは保持されません。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowExitDialog(false)}>キャンセル</Button>
          <Button onClick={confirmExitDemo} variant="contained" autoFocus sx={{ color: "white" }}>
            終了する
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const DemoModeIndicator: React.FC = () => {
  const { isDemo } = useDemoMode();

  if (!isDemo) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        backgroundColor: "info.main",
        color: "white",
        px: 2,
        py: 0.5,
        borderRadius: 2,
        boxShadow: 2,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <InfoIcon fontSize="small" />
      <Typography variant="caption" fontWeight="medium">
        デモモード
      </Typography>
    </Box>
  );
};
