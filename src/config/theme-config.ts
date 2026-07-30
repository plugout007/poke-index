import { createTheme } from "@mui/material/styles";
// TODO: 各々の値はある程度変更する
const theme = createTheme({
  palette: {
    primary: {
      main: '#0A6AA6',
      light: '#E1EEF9',
    },
    warning: {
      main: '#FF4500',
    },
    basic: {
      main: '#C1C1C1',
      light: '#FFF',
      dark: '#1E1E06',
    },
    required: {
      main: '#E5E5E5',
    },
  },
  typography: {
    fontFamily: "'Noto Sans JP', sans-serif",
    h1: {
      fontSize: 30,
      fontWeight: 'bold',
      lineHeight: 1.2,
    },
    h2: {
      fontSize: 28,
      fontWeight: 'bold',
      lineHeight: 1.2,
    },
    h3: {
      fontSize: 24,
      fontWeight: 'bold',
      lineHeight: 1.2,
    },
    h4: {
      fontSize: 20,
      fontWeight: 'bold',
      lineHeight: 1.2,
    },
    h5: {
      fontSize: 16,
      fontWeight: 'bold',
      lineHeight: 1.2,
    },
    h6: {
      fontSize: 14,
      fontWeight: 'bold',
      lineHeight: 1.2,
    },
    body1: {
      fontSize: 16,
      lineHeight: 1.2,
    },
    body2: {
      fontSize: 14,
      lineHeight: 1.2,
    },
  },
  spacing: 1,
  breakpoints: {
    values: {
      xs: 0,
      sm: 375,
      md: 768,
      lg: 1024,
      xl: 9999,
    },
  },
});

// basic, requiredが定義されていないため拡張定義を使う
declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions {
    basic: PaletteColorOptions;
    required: PaletteColorOptions;
  }
  interface Palette {
    basic: PaletteColor;
    required: PaletteColor;
  }
}

export default theme;