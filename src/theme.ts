import { createTheme } from "@mui/material";

export const theme = createTheme({
    typography: {
        fontFamily: [
            'Open Sans',
            'sans-serif',
        ].join(','),
    },
    palette: {
        primary: {
            main: "#ffffff",
        },
        secondary: {
            main: "#384042",
        },
        info: {
            main: "#767A7B",
        },
    },
});
