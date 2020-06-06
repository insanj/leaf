import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';

// import Grid from '@material-ui/core/Grid';

import LeafAuthForm from '../components/leafAuthForm';
import LeafNetworker from  '../backend/leafNetworker';
import LeafCookies from  '../backend/leafCookies';
import LeafLoading from  '../components/leafLoading';

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
      console.log("LOGIN ERROR!\n" + JSON.stringify(e));
    });
  }, [setIsLoading, setIsAuthed]);

  const handleSignInGoClicked = (payload) => {
    const networker = new LeafNetworker();
    networker.login(payload).then(r => {
      alert("LOGIN SUCCESS!\n" + JSON.stringify(r));

      setIsAuthed(true);
      LeafCookies.setCookie(MYLEAF_USERNAME_KEY, payload.username);
      LeafCookies.setCookie(MYLEAF_PASSWORD_KEY, payload.password);
    }).catch(e => {
      alert("LOGIN ERROR!\n" + JSON.stringify(e));
    });
  }

  const handleRegisterGoClicked = (payload) => {
    const networker = new LeafNetworker();
    networker.register(payload).then(r => {
      alert("REGISTER SUCCESS!\n" + JSON.stringify(r));
    }).catch(e => {
      alert("REGISTER ERROR!\n" + JSON.stringify(e));
    });
  }

  const handleSignOutClicked = () => {
    setIsAuthed(false);
    LeafCookies.setCookie(MYLEAF_USERNAME_KEY, '');
    LeafCookies.setCookie(MYLEAF_PASSWORD_KEY, '');
  }

  const authed = (
    <div>
      <button onClick={handleSignOutClicked}>sign out</button>
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