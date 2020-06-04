import React from 'react';
import {Box, ThemeProvider, CssBaseline} from '@material-ui/core'
import Login from './components/Login';
import theme from './theme';
 

function App() {
  return (
      <ThemeProvider theme={theme}>
        <Box display='flex' flexWrap='nowrap' justifyContent='center' alignItems='center'>
          <CssBaseline />
          <Login/>
        </Box>
      </ThemeProvider>
  );
}

export default App;
