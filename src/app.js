import React, {useEffect} from 'react';
import { createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';

import LeafAppBar from './components/leafAppBar';
import LeafTabBar from './components/leafTabBar';
import LeafFooter from './components/leafFooter';
import LeafStepperPage from './pages/leafStepperPage';
import LeafMuseumPage from './pages/leafMuseumPage';
import LeafAdvancedMuseumPage from './pages/leafAdvancedMuseumPage';
import LeafShopPage from './pages/leafShopPage';
import LeafProfilePage from './pages/leafProfilePage';

import LeafVillagersSection from './components/leafVillagersSection';
import LeafNetworker from './backend/leafNetworker';

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
    marginBottom: '65px',

    marginTop: 56, 
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: { 
     marginTop: 48, 
    }, 
    [theme.breakpoints.up('sm')]: { 
     marginTop: 64, 
    }, 
  },
}));

export default function App() {
  const classes = useStyles();
  const networker = new LeafNetworker();

  const [activePage, setActivePage] = React.useState(Cookies.getCookie('LeafActivePage') ? Cookies.getCookie('LeafActivePage') : 'active');
  const [searchText, setSearchText] = React.useState('');
  const [activeTabSortType, setActiveTabSortType] = React.useState(null);
  const [museumTabSortType, setMuseumTabSortType] = React.useState(null);

  const [loadedVillagers, setLoadedVillagers] = React.useState(null);
  const [loadedMuseumEntries, setLoadedMuseumEntries] = React.useState(null);

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
    if (!event) {
      setSearchText('');
      return;
    }

    setSearchText(event.target.value);
  }

  const handleMuseumItemIconClick = (item) => {
    const username = Cookies.getCookie('MYLEAF_USERNAME');
    const password = Cookies.getCookie('MYLEAF_PASSWORD');
    if (!username || !password) {
      return;
    }

    if (loadedMuseumEntries != null && loadedMuseumEntries.filter(e => e.metadata.title === item.title).length > 0) {
      const museumEntryId = loadedMuseumEntries.filter(e => e.metadata.title === item.title)[0].id;
      networker.removeMuseumEntry({ username, password, museumEntryId }).then(r => {
        // alert("Removed item from your museum!");
        handleLoadMuseumEntries();
      }).catch(e => {
        alert("Unable to remove item from your museum :(");
        console.log(e);
      });
    }

    else {
      networker.addMuseumEntry({ username, password, museumEntry: item }).then(r => {
        // alert("Added item to your museum!");
        handleLoadMuseumEntries();
      }).catch(e => {
        alert("Unable to add item from your museum :(");
        console.log(e);
      });    
    }
  }

  const handleVillagerIconClick = (villager) => {
    const username = Cookies.getCookie('MYLEAF_USERNAME');
    const password = Cookies.getCookie('MYLEAF_PASSWORD');
    if (!username || !password) {
      return;
    }

    const villagerName = villager.name;
    if (loadedVillagers != null & loadedVillagers.includes(villagerName)) {
      networker.removeVillager({ username, password, villagerName }).then(r => {
        // alert("Removed villager!");
        handleLoadVillagers();
      }).catch(e => {
        alert("Unable to remove villager");
        console.log(e);
      });
    }

    else {
      networker.addVillager({ username, password, villagerName }).then(r => {
        // alert("Added villager!");
        handleLoadVillagers();
      }).catch(e => {
        alert("Unable to add villager :(");
        console.log(e);
      });    
    }
  }

  const handleLoadVillagers = () => {
    const username = Cookies.getCookie('MYLEAF_USERNAME');
    const password = Cookies.getCookie('MYLEAF_PASSWORD');
    if (!username || !password) {
      setLoadedVillagers([]);
      return;
    }

    networker.getVillagers({ username, password }).then(r => {
      setLoadedVillagers(r.data.map(d => d.villager_name));
    }).catch(e => {
      console.log(e);
    })
  }

  const handleLoadMuseumEntries = () => {
    const username = Cookies.getCookie('MYLEAF_USERNAME');
    const password = Cookies.getCookie('MYLEAF_PASSWORD');
    if (!username || !password) {
      setLoadedMuseumEntries([]);
      return;
    }

    networker.getMuseumEntries({ username, password }).then(r => {
      setLoadedMuseumEntries(r.data);
    }).catch(e => {
      setLoadedMuseumEntries([]);
      console.log(e);
    })
  }

  useEffect(() => {
    if (!loadedVillagers) {
      handleLoadVillagers();
    }

    if (!loadedMuseumEntries) {
      handleLoadMuseumEntries();
    }
  }, [loadedVillagers, setLoadedVillagers, handleLoadVillagers, loadedMuseumEntries, setLoadedMuseumEntries, handleLoadMuseumEntries])

  const generateActivePage = () => {
    if (activePage === 'counters') {
      return (
        <LeafStepperPage
          searchText={searchText}
        />
      );
    } else if (!activePage || activePage === 'active') {
      return (
        <LeafMuseumPage
          searchText={searchText}
          showOnlyActive={true}
          sortType={activeTabSortType}
          onSortTypeChange={(newValue) => setActiveTabSortType(newValue)}
          onItemIconClick={ handleMuseumItemIconClick }
          loadedMuseumEntries={ loadedMuseumEntries }
        />
      );
    } else if (activePage === 'museum') {
      return (
        <LeafAdvancedMuseumPage 
          searchText={searchText}
          showOnlyActive={false}
          sortType={museumTabSortType}
          onSortTypeChange={(newValue) => setMuseumTabSortType(newValue)}
          onItemIconClick={ handleMuseumItemIconClick }
          loadedMuseumEntries={ loadedMuseumEntries }
        />      
      );
    } else if (activePage === 'villagers') {
      return (
        <LeafVillagersSection
          searchText={searchText}
          onVillagerIconClick={ handleVillagerIconClick }
          loadedVillagers={ loadedVillagers }
        />
      );
    } else if (activePage === 'shop') {
      return (
        <LeafShopPage 
          searchText={searchText}
        />
      );
    } else if (activePage === 'profile') {
      return (
        <LeafProfilePage
          searchText={searchText}
          loadedVillagers={loadedVillagers}
          loadedMuseumEntries={loadedMuseumEntries}
        />
      );
    } else {
      return (
        <p>Uh oh, you weren't supposed to see this...</p>
      );
    }
  }

  return (
    <React.Fragment className={classes.root}>

      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
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

        </SnackbarProvider>
      </ThemeProvider>

    </React.Fragment>
  );
}
