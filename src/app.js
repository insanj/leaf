import React from 'react';
import { createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';

import LeafAppBar from './components/leafAppBar';
import LeafTabBar from './components/leafTabBar';
import LeafStepperPage from './pages/leafStepperPage';
import LeafMuseumPage from './pages/leafMuseumPage';

import Cookies from './cookies.js';

import './css/fonts.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00ae6f',
      contrastText: '#fff'
    },
  },
  typography: {
    fontFamily: 'Roboto'
  }
});

const useStyles = makeStyles((theme) => ({
  page: {
    marginTop: '55px',
    marginBottom: '65px',

    [theme.breakpoints.up('sm')]: {
      marginTop: '62px',
    }
  },
}));

export default function App() {
  const classes = useStyles();
  const [activePage, setActivePage] = React.useState(Cookies.getCookie('LeafActivePage') ? Cookies.getCookie('LeafActivePage') : 'active');

  const getOptionalAppBarHeight = (defaultValue=50) => {
    const jsAppBar = document.body.getElementsByClassName("MuiAppBar-root");
    if (!jsAppBar || jsAppBar.length < 1) {
      return 0;
    }

    return jsAppBar[0].clientHeight;
  }

  const handleTabBarActiveChange = (newValue) => {
    setActivePage(newValue);
    Cookies.setCookie('LeafActivePage', newValue);
  }

  const generateActivePage = () => {
    if (!activePage || activePage === 'counters') {
      return (
        <LeafStepperPage />
      );
    } else if (activePage === 'active') {
      return (
        <LeafMuseumPage 
          showOnlyActive={true}
        />
      );
    } else if (activePage === 'museum') {
      return (
        <LeafMuseumPage 
          showOnlyActive={false}
        />      
      );
    } else if (activePage === 'profile') {
      return (
        <p>Your profile will go here :)</p>
      );
    } else {
      return (
        <p>Uh oh, you weren't suppoed to see this...</p>
      );
    }
  }

  return (
    
    <React.Fragment>

      <ThemeProvider theme={theme}>
        <div className={classes.page}>
          { generateActivePage() }
        </div>

        <LeafTabBar
          active={activePage}
          onActiveChange={handleTabBarActiveChange}
        />

        <LeafAppBar />
      </ThemeProvider>

    </React.Fragment>

  );
}
