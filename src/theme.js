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
      main: red.A400
    },
    success: {
      main: green[500]
    },
    warning: {
      main: orange[500]
    },
    background: {
      default: '#fff',
      paper: '#fff'
    },
    text: {
      primary: '#000',
      secondary: '#000'
    }
  }
});

export default theme;
