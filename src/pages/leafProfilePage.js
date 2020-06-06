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

const useStyles = makeStyles((theme) => ({
  unauthed: {
    paddingTop: 30,

    '& > *': {
      marginBottom: 10
    },
  },
}));

export default function LeafProfilePage({ searchText }) {
  const classes = useStyles();
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

    const networker = new LeafNetworker();
    networker.login({
      username: existingUsername,
      password: existingPassword
    }).then(r => {
      console.log("LOGIN SUCCESS!\n" + JSON.stringify(r));
      setIsLoading(false);
      setIsAuthed(true);
    }).catch(e => {
      setIsLoading(false);
      console.log("LOGIN ERROR!\n" + JSON.stringify(e));
    });
  }, [setIsLoading, setIsAuthed]);

  const handleSignInGoClicked = (payload) => {
    const networker = new LeafNetworker();
    networker.login(payload).then(r => {
      console.log("LOGIN SUCCESS!\n" + JSON.stringify(r));

      setIsAuthed(true);
      LeafCookies.setCookie(MYLEAF_USERNAME_KEY, payload.username);
      LeafCookies.setCookie(MYLEAF_PASSWORD_KEY, payload.password);
    }).catch(e => {
      console.log("LOGIN ERROR!\n" + JSON.stringify(e));
    });
  }

  const handleRegisterGoClicked = (payload) => {
    const networker = new LeafNetworker();
    networker.register(payload).then(r => {
      console.log("REGISTER SUCCESS!\n" + JSON.stringify(r));
    }).catch(e => {
      console.log("REGISTER ERROR!\n" + JSON.stringify(e));
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
      <LeafAuthForm
        isLogin={true}
        onGoClick={ handleSignInGoClicked }
      />
      <LeafAuthForm 
        isLogin={false}
        onGoClick={ handleRegisterGoClicked }
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