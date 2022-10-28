import { createTheme } from '@mui/material/styles';
import { blue, green, lightBlue, orange, red } from '@mui/material/colors';

// MUI base style
const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
      contrastText: '#FFF'
    },
    secondary: {
      main: lightBlue[500],
      contrastText: '#FFF'
    },

    error: {
      main: red.A400,
      contrastText: '#FFF',
      dark: red[700]
    },
    success: {
      main: green[500],
      contrastText: '#FFF',
      dark: green[700]
    },
    warning: {
      main: orange[500],
      contrastText: '#FFF'
    },
    background: {
      default: '#fff',
      paper: '#fff'
    },
    text: {
      primary: '#000',
      secondary: '#000'
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  }
});

export default theme;
