import { Layout } from "./components/Layout";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider>
      <ThemeProvider theme={theme}>
        <Layout />
      </ThemeProvider>
    </SnackbarProvider>
  );
}

export default App;
