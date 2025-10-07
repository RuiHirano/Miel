import { ThemeProvider } from "@mui/material";
import AppRoutes from "./Routes";
import { getTheme } from "./theme/theme";
import { useThemeContext } from "./theme/ThemeContext";

function App() {
  const { mode } = useThemeContext();
  const theme = getTheme(mode);
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
