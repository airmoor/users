import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
 const theme = createMuiTheme({
  palette: {
    primary: {
      light: indigo[400],
      main: indigo[500],
      dark: indigo[600]
    },
    secondary: {
      main: '#c8ccff'
    },
    success: {
      main: indigo[200]
    }
  },  
});

export default theme;