import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#ffffff",
      A100: "#626262",
    },
    secondary: {
      main: "#384042",
      A100: "#394ABC",
    },
    info: {
      main: "#767A7B",
    },
    error: {
      main: "#D42222",
    },
  },
});
