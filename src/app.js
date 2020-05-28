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
  const [searchText, setSearchText] = React.useState('');

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

  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
  }

  const generateActivePage = () => {
    if (!activePage || activePage === 'counters') {
      return (
        <LeafStepperPage
          searchText={searchText}
        />
      );
    } else if (activePage === 'active') {
      return (
        <LeafMuseumPage
          searchText={searchText}
          showOnlyActive={true}
        />
      );
    } else if (activePage === 'museum') {
      return (
        <LeafMuseumPage 
          searchText={searchText}
          showOnlyActive={false}
        />      
      );
    } else if (activePage === 'profile') {
      return (
        <p style={{margin: 30, paddingTop: 10}}>Your profile will go here! Maybe tracking museum progress and turnip prices?</p>
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

        <LeafAppBar 
          onSearchInputChange={handleSearchInputChange}
        />
      </ThemeProvider>

    </React.Fragment>
  );
}
