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
            main: "#081440",
        },
        secondary: {
            main: "#ffffff",
        },
        text: {
            primary: "#ffffff",
        },
        info: {
            main: "#767A7B",
        },
    },
});
