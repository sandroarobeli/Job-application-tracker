import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 685,
      laptop: 900,
    },
  },
  typography: {
    fontFamily: "Segoe UI, Roboto, Helvetica, Arial, sans-serif",
    fontSize: 16,
    button: {
      textTransform: "none", // Allows displaying lowercase in <Buttons />
      fontWeight: "bold",
    },
  },
  palette: {
    mode: "dark",
  },
});

export default theme;
