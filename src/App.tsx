import { ThemeProvider } from "@mui/material";
import AppRoutes from "./Routes";
import { getTheme } from "./theme/theme";
import { useThemeContext } from "./theme/ThemeContext";
import { DemoModeProvider } from "./contexts/DemoModeContext";
import { DatabaseProvider } from "./components/common/DatabaseProvider";

function App() {
  const { mode } = useThemeContext();
  const theme = getTheme(mode);
  return (
    <ThemeProvider theme={theme}>
      <DemoModeProvider>
        <DatabaseProvider>
          <AppRoutes />
        </DatabaseProvider>
      </DemoModeProvider>
    </ThemeProvider>
  );
}

export default App;
