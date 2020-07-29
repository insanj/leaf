import React, {useEffect} from 'react';
import { createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';

import Lightbox from 'react-image-lightbox';

import LeafAppBar from '../components/leafAppBar';
import LeafTabBar from '../components/leafTabBar';
import LeafFooter from '../components/leafFooter';
import LeafVillagersSection from '../components/leafVillagersSection';
import LeafDrawer from '../components/leafDrawer';

import LeafStepperPage from './leafStepperPage';
import LeafMuseumPage from './leafMuseumPage';
import LeafAdvancedMuseumPage from './leafAdvancedMuseumPage';
import LeafShopPage from './leafShopPage';
import LeafProfilePage from './leafProfilePage';
import LeafSongsPage from './leafSongsPage';

import LeafNetworker from '../backend/leafNetworker';
import LeafImageManager from '../backend/leafImageManager';
import LeafCookies from '../backend/leafCookies';
import LeafDataManager from '../backend/leafDataManager';

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

export default function LeafRootPage({}) {
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const networker = new LeafNetworker();

  const [activePage, setActivePage] = React.useState(LeafCookies.getCookie('LeafActivePage') ? LeafCookies.getCookie('LeafActivePage') : 'active');
  const [searchText, setSearchText] = React.useState('');
  const [activeTabSortType, setActiveTabSortType] = React.useState(null);
  const [museumTabSortType, setMuseumTabSortType] = React.useState(null);

  const [loadedVillagers, setLoadedVillagers] = React.useState(null);
  const [loadedMuseumEntries, setLoadedMuseumEntries] = React.useState(null);

  const appSnackbarProps = {
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center',
    },
    autoHideDuration: 2000,
    onClick: () => closeSnackbar(),
  };

  const getOptionalAppBarHeight = (defaultValue=50) => {
    const jsAppBar = document.body.getElementsByClassName("MuiAppBar-root");
    if (!jsAppBar || jsAppBar.length < 1) {
      return 0;
    }

    return jsAppBar[0].clientHeight;
  }

  const handleTabBarActiveChange = (newValue) => {
    setActivePage(newValue);
    LeafCookies.setCookie('LeafActivePage', newValue);
  }

  const handleSearchInputChange = (event) => {
    if (!event) {
      setSearchText('');
      return;
    }

    setSearchText(event.target.value);
  }

  const handleMuseumItemIconClick = (item) => {
    const username = LeafCookies.getCookie('MYLEAF_USERNAME');
    const password = LeafCookies.getCookie('MYLEAF_PASSWORD');
    if (!username || !password) {
      return;
    }

    if (loadedMuseumEntries != null && loadedMuseumEntries.filter(e => e.metadata.title === item.title).length > 0) {
      const museumEntryId = loadedMuseumEntries.filter(e => e.metadata.title === item.title)[0].id;
      networker.removeMuseumEntry({ username, password, museumEntryId }).then(r => {
        enqueueSnackbar('Removed museum entry!', {
          variant: 'success',
          ...appSnackbarProps
        });

        handleLoadMuseumEntries();
      }).catch(e => {
        alert("Unable to remove item from your museum :(");
        console.log(e);
      });
    }

    else {
      const museumEntry = item;
      delete museumEntry['image']; // this is gonna be a blob
      networker.addMuseumEntry({ username, password, museumEntry }).then(r => {
        enqueueSnackbar('Added museum entry!', {
          variant: 'success',
          ...appSnackbarProps
        });

        handleLoadMuseumEntries();
      }).catch(e => {
        alert("Unable to add item to your museum :(");
        console.log(e);
      });    
    }
  }

  const handleVillagerIconClick = (villager) => {
    const username = LeafCookies.getCookie('MYLEAF_USERNAME');
    const password = LeafCookies.getCookie('MYLEAF_PASSWORD');
    if (!username || !password) {
      return;
    }

    const villagerName = villager.name;
    if (loadedVillagers != null & loadedVillagers.includes(villagerName)) {
      networker.removeVillager({ username, password, villagerName }).then(r => {
        enqueueSnackbar('Removed villager!', {
          variant: 'success',
          ...appSnackbarProps
        });
          
        handleLoadVillagers();
      }).catch(e => {
        alert("Unable to remove villager");
        console.log(e);
      });
    }

    else {
      networker.addVillager({ username, password, villagerName }).then(r => {
        enqueueSnackbar('Added villager!', {
          variant: 'success',
          ...appSnackbarProps
        });
          
        handleLoadVillagers();
      }).catch(e => {
        alert("Unable to add villager :(");
        console.log(e);
      });    
    }
  }

  const handleLoadVillagers = () => {
    const username = LeafCookies.getCookie('MYLEAF_USERNAME');
    const password = LeafCookies.getCookie('MYLEAF_PASSWORD');
    if (!username || !password) {
      setLoadedVillagers([]);
      return;
    }

    networker.getVillagers({ username, password }).then(r => {
      const sortedNames = r.data.map(d => d.villager_name).sort();
      setLoadedVillagers(sortedNames);
    }).catch(e => {
      console.log(e);
    })
  }

  const handleLoadMuseumEntries = () => {
    const username = LeafCookies.getCookie('MYLEAF_USERNAME');
    const password = LeafCookies.getCookie('MYLEAF_PASSWORD');
    if (!username || !password) {
      setLoadedMuseumEntries([]);
      return;
    }

    networker.getMuseumEntries({ username, password }).then(r => {
      const seacreatures = LeafDataManager.getSeacreatures();
      const imagePopulatedEntries = r.data.map(e => {
        const entryName = e.metadata ? e.metadata.title : null;
        if (!entryName) {
          return e;
        }

        const entryLowercased = entryName.toLowerCase();
        const matches = seacreatures.filter(s => {
          const seacreatureName = s.name.toLowerCase();
          return entryLowercased === seacreatureName;
        });

        if (matches && matches.length > 0) {
          e.metadata.image = matches[0].icon ? matches[0].icon : matches[0].image;
        }

        return e;
      });
      setLoadedMuseumEntries(imagePopulatedEntries);
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

  const [lightboxImage, setLightboxImage] = React.useState(null);
  const onArtItemIconClick = (item) => {
    const image = item.image ? item.image : LeafImageManager.getMuseumImageForName(item.title);
    setLightboxImage(image);
  }

  const handleSongClick = (song) => {
    const username = LeafCookies.getCookie('MYLEAF_USERNAME');
    const password = LeafCookies.getCookie('MYLEAF_PASSWORD');
    if (!username || !password) {
      return;
    }

    const songName = song.name;
    if (loadedMuseumEntries != null && loadedMuseumEntries.filter(e => e.metadata.name === songName).length > 0) {
      const museumEntryId = loadedMuseumEntries.filter(e => e.metadata.name === songName)[0].id;
      networker.removeMuseumEntry({ username, password, museumEntryId }).then(r => {
        enqueueSnackbar('Removed song!', {
          variant: 'success',
          ...appSnackbarProps
        });

        handleLoadMuseumEntries();
      }).catch(e => {
        alert("Unable to remove song :(");
        console.log(e);
      });
    }

    else {
      const museumEntry = {
        name: song.name
      };
      networker.addMuseumEntry({ username, password, museumEntry }).then(r => {
        enqueueSnackbar('Added song!', {
          variant: 'success',
          ...appSnackbarProps
        });

        handleLoadMuseumEntries();
      }).catch(e => {
        alert("Unable to add song :(");
        console.log(e);
      });         
    }
  }

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
          onArtItemIconClick={ onArtItemIconClick }
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
          onArtItemIconClick={ onArtItemIconClick }
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
    } else if (activePage === 'songs') {
      return (
        <LeafSongsPage
          searchText={searchText}
          onSongClick={handleSongClick}
          loadedMuseumEntries={loadedMuseumEntries}
        />
      );
    }  
    else {
      return (
        <p style={{textAlign: 'center', color: 'white', fontSize: '30px', paddingTop: '50px'}}>😋<br/>Coming soon!</p>
      );
    }
  }

  const [leafDrawerOpen, setLeafDrawerOpen] = React.useState(false);
  const onAppBarDrawerClick = () => {
    setLeafDrawerOpen(true);
  }

  const onLeafDrawerCloseClick = () => {
    setLeafDrawerOpen(false);
  }

  const onLeafDrawerItemClick = (item) => {
    setLeafDrawerOpen(false);
    setActivePage(item);
    LeafCookies.setCookie('LeafActivePage', item);
  }

  return (
    <React.Fragment>
      <div className={classes.page}>
        { generateActivePage() }
        <LeafFooter />
      </div>

      <LeafAppBar 
        onSearchInputChange={activePage === 'profile' ? null: handleSearchInputChange}
        onDrawerClick={onAppBarDrawerClick}
      />

      { !lightboxImage ? '' : (
        <Lightbox
          mainSrc={lightboxImage}
          onCloseRequest={() => setLightboxImage(null)}
          reactModalStyle={{
            overlay: {
              zIndex: 1300
            }
          }}
        />
      ) }

      <LeafDrawer
        open={ leafDrawerOpen }
        onItemClick={ onLeafDrawerItemClick }
        onCloseClick={ onLeafDrawerCloseClick }
      />
    </React.Fragment>
  );
}