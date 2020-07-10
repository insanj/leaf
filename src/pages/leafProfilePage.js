import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';

// import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import BookIcon from '@material-ui/icons/Book';
import HomeIcon from '@material-ui/icons/Home';

import LeafAuthForm from '../components/leafAuthForm';
import LeafNetworker from  '../backend/leafNetworker';
import LeafCookies from  '../backend/leafCookies';
import LeafLoading from  '../components/leafLoading';

import LeafProfileCountersSection from '../components/leafProfileCountersSection';

import { useSnackbar } from 'notistack';
import Slide from '@material-ui/core/Slide';
import Grow from '@material-ui/core/Grow';

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
  }
}));

export default function LeafProfilePage({ searchText }) {
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = React.useState(true);
  const [isAuthed, setIsAuthed] = React.useState(false);
  const [authedTabValue, setAuthedTabValue] = React.useState(0);

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
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
      autoHideDuration: 2000,
    });

    const networker = new LeafNetworker();
    networker.login({
      username: existingUsername,
      password: existingPassword
    }).then(r => {
      enqueueSnackbar('🎉 Signed in successfully!', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
          autoHideDuration: 3000,
      });

      setIsLoading(false);
      setIsAuthed(true);
    }).catch(e => {
      setIsLoading(false);
    
      const errorMsg = e && e.message ? e.message : JSON.stringify(e);
      enqueueSnackbar(errorMsg, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        autoHideDuration: 3000,
      });

    });
  }, [setIsLoading, setIsAuthed]);

  const handleSignInGoClicked = (payload) => {
    enqueueSnackbar('Signing in...', {
      variant: 'info',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
      autoHideDuration: 500,
    });

    const networker = new LeafNetworker();
    networker.login(payload).then(r => {
      enqueueSnackbar('🎉 Signed in successfully!', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        autoHideDuration: 3000,
      });

      setIsAuthed(true);
      LeafCookies.setCookie(MYLEAF_USERNAME_KEY, payload.username);
      LeafCookies.setCookie(MYLEAF_PASSWORD_KEY, payload.password);
    }).catch(e => {
      const errorMsg = e && e.message ? e.message : JSON.stringify(e);
      enqueueSnackbar(errorMsg, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        autoHideDuration: 3000,
      });
    });
  }

  const handleRegisterGoClicked = (payload) => {
    enqueueSnackbar('Registering for an account...', {
      variant: 'info',
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      },
      autoHideDuration: 500,
    });

    const networker = new LeafNetworker();
    networker.register(payload).then(r => {
      enqueueSnackbar('🎉 Thanks for making an account! Try signing in with your username and password now.', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        autoHideDuration: 3000,
      });

    }).catch(e => {
      const errorMsg = e && e.message ? e.message : JSON.stringify(e);
      enqueueSnackbar(errorMsg, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        autoHideDuration: 3000,
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

  const generateAuthedTabSection = () => {
    if (authedTabValue === 0) {
      return (
        <LeafProfileCountersSection 
          searchText={searchText}
          getCounters={handleProfileGetCounters}
          setCounters={handleProfileSetCounters}
        />
      );
    } else if (authedTabValue === 1) {
      return (
        'Coming soon!'
      );
    } else if (authedTabValue === 2) {
      return (
        'Coming soon!'
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
          <Tab icon={<AddToPhotosIcon />} label="My Counters" />
          <Tab icon={<BookIcon />} label="My Museum" />
          <Tab icon={<HomeIcon />} label="My Villagers" />
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