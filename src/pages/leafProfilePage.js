import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';

// import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import BookIcon from '@material-ui/icons/Book';
import HomeIcon from '@material-ui/icons/Home';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

import LeafAuthForm from '../components/leafAuthForm';
import LeafNetworker from  '../backend/leafNetworker';
import LeafCookies from  '../backend/leafCookies';
import LeafLoading from  '../components/leafLoading';

import LeafProfileCountersSection from '../components/leafProfileCountersSection';

import LeafVillagerCell from '../components/leafVillagerCell';
import LeafMuseumCard from '../components/leafMuseumCard';
import LeafVillagerGiftBuyingCell from '../components/leafVillagerGiftBuyingCell';

import { useSnackbar } from 'notistack';
import Slide from '@material-ui/core/Slide';
import Grow from '@material-ui/core/Grow';

import LeafDataManager from '../backend/leafDataManager';

function GrowTransition(props) {
  return <Grow {...props} />;
}

const useStyles = makeStyles((theme) => ({
  unauthed: {
    '& > *': {
      marginBottom: 10
    },
  },
  unauthedLanding: {
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    margin: 30,
    textAlign: 'center',
    maxWidth: 300,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  uncheckButton: {
    marginTop: 10,
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 200,
    height: 60,
    textAlign: 'center'
  }
}));

const getVillagerGiftBuyingChecksCookie = () => {
  const cookie = LeafCookies.getCookie('leaf_villagerGiftBuyingChecks');
  if (!cookie || cookie.length < 1) {
    return [];
  }

  try {
    const parsed = JSON.parse(cookie);
    return parsed;
  } catch (e) {
    console.log(e);
    return [];
  }
}

const setVillagerGiftBuyingChecksCookie = (value) => {
  const string = JSON.stringify(value);
  LeafCookies.setCookie('leaf_villagerGiftBuyingChecks', string);
}

const getProfileTabValueCookie = () => {
  const cookie = LeafCookies.getCookie('leaf_profileTabValue');
  if (!cookie || cookie.length < 1) {
    return 0;
  }

  return +cookie;
}

const setProfileTabValueCookie = (value) => {
  const string = `${value}`;
  LeafCookies.setCookie('leaf_profileTabValue', string);
}

export default function LeafProfilePage({ searchText, loadedVillagers, loadedMuseumEntries, handleVillagerIconClick, onItemIconClick }) {
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const profileSnackbarProps = {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'center',
    },
    autoHideDuration: 2000,
    onClick: () => closeSnackbar(),
  };

  const [isLoading, setIsLoading] = React.useState(true);
  const [isAuthed, setIsAuthed] = React.useState(false);
  const [authedTabValue, setAuthedTabValue] = React.useState(getProfileTabValueCookie());

  const MYLEAF_USERNAME_KEY = "MYLEAF_USERNAME";
  const MYLEAF_PASSWORD_KEY = "MYLEAF_PASSWORD";

  useEffect(() => {
    const existingUsername = LeafCookies.getCookie(MYLEAF_USERNAME_KEY);
    const existingPassword = LeafCookies.getCookie(MYLEAF_PASSWORD_KEY);

    if (!existingUsername || existingUsername.length < 1 || !existingPassword || existingPassword.length < 1) {
      setIsLoading(false);
      return;
    }

    const snackMsg = `👋 Welcome back, ${existingUsername}! Signing in...`;
    enqueueSnackbar(snackMsg, {
      variant: 'info',
      ...profileSnackbarProps
    });

    const networker = new LeafNetworker();
    networker.login({
      username: existingUsername,
      password: existingPassword
    }).then(r => {
      enqueueSnackbar('🎉 Signed in successfully!', {
        variant: 'success',
        ...profileSnackbarProps
      });

      setIsLoading(false);
      setIsAuthed(true);
    }).catch(e => {
      setIsLoading(false);
    
      const errorMsg = e && e.message ? e.message : JSON.stringify(e);
      enqueueSnackbar(errorMsg, {
        variant: 'error',
        ...profileSnackbarProps
      });

    });
  }, [setIsLoading, setIsAuthed]);

  const handleSignInGoClicked = (payload) => {
    enqueueSnackbar('Signing in...', {
      variant: 'info',
      ...profileSnackbarProps
    });

    const networker = new LeafNetworker();
    networker.login(payload).then(r => {
      enqueueSnackbar('🎉 Signed in successfully!', {
        variant: 'success',
        ...profileSnackbarProps
      });

      setIsAuthed(true);
      LeafCookies.setCookie(MYLEAF_USERNAME_KEY, payload.username);
      LeafCookies.setCookie(MYLEAF_PASSWORD_KEY, payload.password);
    }).catch(e => {
      const errorMsg = e && e.message ? e.message : JSON.stringify(e);
      enqueueSnackbar(errorMsg, {
        variant: 'error',
        ...profileSnackbarProps
      });
    });
  }

  const handleRegisterGoClicked = (payload) => {
    enqueueSnackbar('Registering for an account...', {
      variant: 'info',
      ...profileSnackbarProps
    });

    const networker = new LeafNetworker();
    networker.register(payload).then(r => {
      enqueueSnackbar('🎉 Thanks for making an account! Try signing in with your username and password now.', {
        variant: 'success',
      ...profileSnackbarProps
      });

    }).catch(e => {
      const errorMsg = e && e.message ? e.message : JSON.stringify(e);
      enqueueSnackbar(errorMsg, {
        variant: 'error',
        ...profileSnackbarProps
      });
    });
  }

  const handleSignOutClicked = () => {
    setIsAuthed(false);
    LeafCookies.setCookie(MYLEAF_USERNAME_KEY, '');
    LeafCookies.setCookie(MYLEAF_PASSWORD_KEY, '');
  }

  const handleAuthedTabChange = (event, newValue) => {
    setAuthedTabValue(newValue);
    setProfileTabValueCookie(newValue);
  }

  const handleProfileGetCounters = () => {
    return new Promise((resolve, reject) => {
      const networker = new LeafNetworker();
      const payload = {
        username: LeafCookies.getCookie(MYLEAF_USERNAME_KEY),
        password: LeafCookies.getCookie(MYLEAF_PASSWORD_KEY)
      };

      networker.getCounters(payload).then(r => {
        console.log("GET COUNTERS SUCCESS!\n" + JSON.stringify(r));
        resolve(r.data);
      }).catch(e => {
        console.log("GET COUNTERS ERROR!\n" + JSON.stringify(e));
        reject(e);
      });
    });
  }

  const handleProfileSetCounters = (itemValues) => {
    return new Promise((resolve, reject) => {
      const networker = new LeafNetworker();
      const payload = {
        username: LeafCookies.getCookie(MYLEAF_USERNAME_KEY),
        password: LeafCookies.getCookie(MYLEAF_PASSWORD_KEY),
        itemValues: itemValues
      };

      networker.setCounters(payload).then(r => {
        console.log("SET COUNTERS SUCCESS!\n" + JSON.stringify(r));
        resolve(r.data);
      }).catch(e => {
        console.log("SET COUNTERS ERROR!\n" + JSON.stringify(e));
        reject(e);
      });
    });
  }

  
  const [villagerTabValue, setVillagerTabValue] = React.useState(LeafCookies.getCookie('leaf_villagerTabValue') ? +LeafCookies.getCookie('leaf_villagerTabValue') : 0);
  const handleVillagerTabValueChange = (event, newValue) => {
    setVillagerTabValue(newValue);
    LeafCookies.setCookie('leaf_villagerTabValue', newValue);
  }


  const [villagerGiftBuyingChecks, setVillagerGiftBuyingChecks] = React.useState( getVillagerGiftBuyingChecksCookie() );
  const handleVillagerGiftBuyingClick = (villager) => {
    const index = villagerGiftBuyingChecks.indexOf(villager.name);
    let newValue = [];
    if (index >= 0) {
      newValue = villagerGiftBuyingChecks.filter(v => v !== villager.name);
    } else {
      newValue = villagerGiftBuyingChecks.slice();
      newValue.push(villager.name);
    }

    setVillagerGiftBuyingChecks(newValue);
    setVillagerGiftBuyingChecksCookie(newValue);
  }

  const handleUncheckAllVillagersClick = () => {
    setVillagerGiftBuyingChecks([]);
    setVillagerGiftBuyingChecksCookie([]);
  }

  const generateAuthedTabSection = () => {
    if (authedTabValue === 2) {
      return (
        <LeafProfileCountersSection 
          searchText={searchText}
          getCounters={handleProfileGetCounters}
          setCounters={handleProfileSetCounters}
        />
      );
    } else if (authedTabValue === 1) {
      return (
        <div style={{color: "#fff"}}>
          <Grid container spacing={2} style={{padding: 10}}>

          { !loadedMuseumEntries ? '' : loadedMuseumEntries.map(e => {
            if (!e.metadata.title) {
              return '';
            }

            return (
              <LeafMuseumCard
                item={ e.metadata }
                image={ null }
                onItemIconClick={ (event, item) => onItemIconClick(item) }
                hasMuseumEntry={ false }
              />
            );
          }) }

          <p style={{color: "#fff", textAlign: 'center', padding: 50, width: '100%'}}>
          🐝<br/>
          Tap on the image for a<br/>bug, fish, or sea creature to add<br/>it to your personal museum.
          </p>
        </Grid>
      </div>
      );
    } else if (authedTabValue === 0) {
      const cells = !loadedVillagers ? [] : loadedVillagers.map(v => {
        const allVillagers = LeafDataManager.getVillagers();
        const existing = allVillagers.filter(d => d.name === v);
        if (existing.length < 1) {
          return '';
        }

        if (villagerTabValue !== 0 ) {
          return (
            <LeafVillagerGiftBuyingCell
              villager={ existing[0] }
              checked={ villagerGiftBuyingChecks.includes(existing[0].name) }
              onVillagerClick={ handleVillagerGiftBuyingClick }
            />
          );
        }

        return (
          <LeafVillagerCell 
            villager={ existing[0] }
            loadedVillagers={ [] }
            onVillagerIconClick={ handleVillagerIconClick }
          />
        );
      });

      return (
        <div style={{color: "#fff"}}>
          <Tabs style={{cursor: 'pointer'}} centered value={villagerTabValue} onChange={handleVillagerTabValueChange} aria-label="">
            <Tab label="Alphabetical" />
            <Tab label="Gift Buying Guide" />
          </Tabs>

          { villagerTabValue !== 0 ? (
            <div>
              <Button className={classes.uncheckButton} variant="contained" color="primary" onClick={ handleUncheckAllVillagersClick }>
                <DoneOutlineIcon />
                Uncheck All Villagers
              </Button>      
              <Grid 
                container 
                spacing={0} 
                style={{padding: 10}}  
                justify="center"
                alignItems="center"
              >        
                { cells } 
              </Grid>
            </div>
          ) : (
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableBody>
                  { cells }
                </TableBody>
              </Table>
            </TableContainer>
          ) }

          <p style={{color: "#fff", textAlign: 'center', paddingTop: 50}}>
            🐝<br/>
            Tap on the image for a<br/>villager it to your personal list.
          </p>
        </div>
      );
    }
  }

  const authed = (
    <div>
      <Paper className={classes.root}>
        <Tabs
          value={authedTabValue}
          onChange={handleAuthedTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab icon={<HomeIcon />} label="Villagers" />
          <Tab icon={<BookIcon />} label="Museum" />
          <Tab icon={<AddToPhotosIcon />} label="Counters" />
        </Tabs>
      </Paper>

      { generateAuthedTabSection() }

    </div>
  );

  const unauthed = (
    <div className={classes.unauthed}>

      <Paper className={classes.unauthedLanding}>
        <h1>🐝</h1>
        <h3>👋 Welcome to <b>myleaf.fun</b>!</h3>
        <h4>Most of our features do not require you to make an account... but if you want to keep track of your <i>tool durability</i>, <i>museum donations</i>, or <i>island villagers</i>, go ahead and make an account! It's completely free.<br/>❤️</h4>

        <p style={{opacity: 0.5}}>By using myleaf.fun you are agreeing to the use of cookies (mostly to make sure you stay signed in!)</p>
      </Paper>

      <LeafAuthForm 
        isLogin={false}
        onGoClick={ handleRegisterGoClicked }
      />

      <LeafAuthForm
        isLogin={true}
        onGoClick={ handleSignInGoClicked }
      />
     
    </div>
  );

  return (
    <div>
      { isLoading === true ? (
        <LeafLoading />
      ) : (isAuthed === true ? authed : unauthed) }
    </div>
  );

}