import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export
export const tokens = (mode:any) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#dad9dc",
          200: "#b5b3b9",
          300: "#908e95",
          400: "#6b6872",
          500: "#46424f",
          600: "#38353f",
          700: "#2a282f",
          800: "#1c1a20",
          900: "#0e0d10"
},
        bgk: {
          100: "#d1d0d3",
          200: "#a3a2a8",
          300: "#76737c",
          400: "#484551",
          500: "#1a1625",
          600: "#15121e",
          700: "#100d16",
          800: "#0a090f",
          900: "#050407"
        },
        primary: {
          100: "#d5d5d8",
          200: "#acaab0",
          300: "#828089",
          400: "#595561",
          500: "#2f2b3a",
          600: "#26222e",
          700: "#1c1a23",
          800: "#131117",
          900: "#09090c"
        },
        greyAccent: {
          100: "#e9e8ea",
          200: "#d3d1d5",
          300: "#bcbbc0",
          400: "#a6a4ab",
          500: "#908d96",
          600: "#737178",
          700: "#56555a",
          800: "#3a383c",
          900: "#1d1c1e"
        },
        redAccent: {
          100: "#f8dcdb",
          200: "#f1b9b7",
          300: "#e99592",
          400: "#e2726e",
          500: "#db4f4a",
          600: "#af3f3b",
          700: "#832f2c",
          800: "#58201e",
          900: "#2c100f",
        },
        purpleAccent: {
          100: "#e4defd",
          200: "#cabdfb",
          300: "#af9cf9",
          400: "#957bf7",
          500: "#7a5af5",
          600: "#6248c4",
          700: "#493693",
          800: "#312462",
          900: "#181231"
        },
      }
    : {
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          100: "#040509",
          200: "#080b12",
          300: "#0c101b",
          400: "#f2f0f0", // manually changed
          500: "#141b2d",
          600: "#1F2A40",
          700: "#727681",
          800: "#a1a4ab",
          900: "#d0d1d5",
        },
        greyAccent: {
          100: "#1d1c1e",
          200: "#3a383c",
          300: "#56555a",
          400: "#737178",
          500: "#908d96",
          600: "#a6a4ab",
          700: "#bcbbc0",
          800: "#d3d1d5",
          900: "#e9e8ea"
        },
        redAccent: {
          100: "#2c100f",
          200: "#58201e",
          300: "#832f2c",
          400: "#af3f3b",
          500: "#db4f4a",
          600: "#e2726e",
          700: "#e99592",
          800: "#f1b9b7",
          900: "#f8dcdb",
        },
        purpleAccent: {
          100: "#e4defd",
          200: "#cabdfb",
          300: "#af9cf9",
          400: "#957bf7",
          500: "#7a5af5",
          600: "#6248c4",
          700: "#493693",
          800: "#312462",
          900: "#181231"
        },
        bgk: {
          100: "#fcfcfc",
          200: "#fcfcfc",
          300: "#fcfcfc",
          400: "#fcfcfc",
          500: "#fcfcfc",
          600: "#fcfcfc",
          700: "#fcfcfc",
          800: "#fcfcfc",
          900: "#fcfcfc"
        },
      }),
});

// mui theme settings
export const themeSettings = (mode:any) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.greyAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.bgk[500],
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.purpleAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#fcfcfc",
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode] as const;
};