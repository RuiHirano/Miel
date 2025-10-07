import type { PaletteMode } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";

// カスタムカラーパレット
const customColors = {
  primary: {
    main: "#1976d2", // MUI default blue
    light: "#42a5f5",
    dark: "#1565c0",
  },
  secondary: {
    main: "#2e8555", // ForeXpert brand green
    light: "#4caf50",
    dark: "#1b5e20",
  },
  success: {
    main: "#4caf50",
    light: "#81c784",
    dark: "#388e3c",
  },
  error: {
    main: "#f44336",
    light: "#e57373",
    dark: "#d32f2f",
  },
  warning: {
    main: "#ff9800",
    light: "#ffb74d",
    dark: "#f57c00",
  },
  info: {
    main: "#2196f3",
    light: "#64b5f6",
    dark: "#1976d2",
  },
};

const customTypography = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  h1: {
    fontWeight: 700,
  },
  h2: {
    fontWeight: 600,
  },
  h3: {
    fontWeight: 600,
  },
  h4: {
    fontWeight: 600,
  },
  h5: {
    fontWeight: 500,
  },
  h6: {
    fontWeight: 500,
  },
};

const customShape = {
  borderRadius: 8,
};

// テーマを作成
export const lightTheme: Theme = createTheme({
  palette: {
    mode: "light" as PaletteMode,
    primary: customColors.primary,
    secondary: customColors.secondary,
    success: customColors.success,
    error: customColors.error,
    warning: customColors.warning,
    info: customColors.info,
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
  },
  typography: customTypography,
  shape: customShape,
});
export const darkTheme: Theme = createTheme({
  palette: {
    mode: "dark" as PaletteMode,
    primary: {
      main: "#90caf9", // Lighter blue for dark mode
      light: "#bbdefb",
      dark: "#64b5f6",
    },
    secondary: {
      main: "#66bb6a", // Lighter green for dark mode
      light: "#81c784",
      dark: "#4caf50",
    },
    success: customColors.success,
    error: customColors.error,
    warning: customColors.warning,
    info: customColors.info,
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#aaaaaa",
    },
  },
  typography: customTypography,
  shape: customShape,
});

// テーマを取得する関数
export const getTheme = (mode: PaletteMode): Theme => {
  return mode === "light" ? lightTheme : darkTheme;
};
