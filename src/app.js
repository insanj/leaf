import React, {useEffect} from 'react';
import { createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import { SnackbarProvider, useSnackbar } from 'notistack';

import LeafRootPage from './pages/leafRootPage';

import './css/fonts.css';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#00ae6f',
      contrastText: '#fff'
    },
  },
  typography: {
    fontFamily: ['Octarine-Bold'].join(',')
  }
});

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#272922'
  },
}));

export default function App() {
  const classes = useStyles();
  return (
    <React.Fragment className={classes.root}>

      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <LeafRootPage />
        </SnackbarProvider>
      </ThemeProvider>

    </React.Fragment>
  );
}
