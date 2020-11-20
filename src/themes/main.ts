import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1E283B',
    },
    secondary: {
      main: '#fff',
    },
    background: {
      default: '#fff',
    },
    action: {
      selected: '#fff',
      hover: 'rgba(255, 255, 255, .3)',
    },
    divider: '#000',
  },
  typography: {
    fontFamily: [
      'Mulish',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  mixins: {
    toolbar: {
      minHeight: '66px',
    },
  },
});

export default theme;
