import React from 'react';
import { createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';

import LeafAppBar from './components/leafAppBar';
import LeafTabBar from './components/leafTabBar';
import LeafFooter from './components/leafFooter';
import LeafStepperPage from './pages/leafStepperPage';
import LeafMuseumPage from './pages/leafMuseumPage';
import LeafAdvancedMuseumPage from './pages/leafAdvancedMuseumPage';
import LeafShopPage from './pages/leafShopPage';

import LeafVillagersSection from './components/leafVillagersSection';

import Cookies from './cookies.js';

import './css/fonts.css';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
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
  root: {
    background: '#272922'
  },
  page: {
    background: '#272922',
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
  const [activeTabSortType, setActiveTabSortType] = React.useState(null);
  const [museumTabSortType, setMuseumTabSortType] = React.useState(null);

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
          sortType={activeTabSortType}
          onSortTypeChange={(newValue) => setActiveTabSortType(newValue)}
        />
      );
    } else if (activePage === 'museum') {
      return (
        <LeafAdvancedMuseumPage 
          searchText={searchText}
          showOnlyActive={false}
          sortType={museumTabSortType}
          onSortTypeChange={(newValue) => setMuseumTabSortType(newValue)}
        />      
      );
    } else if (activePage === 'profile') {
      return (
        <LeafVillagersSection
          searchText={searchText}
        />
      );
    } else if (activePage === 'shop') {
      return (
        <LeafShopPage 
          searchText={searchText}
        />
      );
    }  else {
      return (
        <p>Uh oh, you weren't suppoed to see this...</p>
      );
    }
  }

  return (
    <React.Fragment className={classes.root}>

      <ThemeProvider theme={theme}>
        <div className={classes.page}>
          { generateActivePage() }

          <LeafFooter />
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
