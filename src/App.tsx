import { ThemeProvider } from "@mui/material";
import { DemoModeProvider } from "./contexts/DemoModeContext";
import AppRoutes from "./Routes";
import { getTheme } from "./theme/theme";
import { useThemeContext } from "./theme/ThemeContext";

function App() {
  const { mode } = useThemeContext();
  const theme = getTheme(mode);
  return (
    <ThemeProvider theme={theme}>
      <DemoModeProvider>
        <AppRoutes />
      </DemoModeProvider>
    </ThemeProvider>
  );
}

export default App;
