import React, { useContext } from "react";
import { ColorModeContext } from "../theme/ColourModeProvider";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export default function MUIThemeProvider(props) {
  const [mode] = useContext(ColorModeContext);
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "light" ? "#034AAC" : "#0067F5",
          },
          secondary: {
            main: mode === "light" ? "#034AAC" : "#0067F5",
          },
          error: {
            main: mode === "light" ? "#ff3333" : "#d32525",
          },
          text: {
            primary: mode === "light" ? "#000000" : "#ffffff",
          },
          background: {
            default: mode === "light" ? "#ffffff" : "#000000",
          },
          
        },
       
        breakpoints: {
          values: {
            xs: 280.05,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
          },
        },
      }),
    [mode]
  );

  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
