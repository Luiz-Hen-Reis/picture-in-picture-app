import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#0F0A0A",
      contrastText: "#F5EFED",
    },
    secondary: {
      main: "#F5EFED",
      contrastText: "#0F0A0A",
    },
  },
  typography: {
    allVariants: {
      color: "#F5EFED",
    },
  },
});
