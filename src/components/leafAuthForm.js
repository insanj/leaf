import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '300px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  form: {
    background: 'rgba(0,0,0,0.2)',
    borderRadius: '15px',
    padding: 15,

    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  header: {
    fontSize: '1.5em',
    fontWeight: 500,
    color: '#fff',
  },
  button: {
    marginTop: 20,
    marginBottom: 10,
    width: '94%'
  }
}));

export default function LeafAuthForm({ isLogin=true, onGoClick }) {
  const classes = useStyles();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleButtonClicked = () => {
    onGoClick({
      username: username,
      password: password
    });
  }

  return (
    <div className={classes.root}>
      <form className={classes.form} noValidate>
        <div className={classes.header}>
          { isLogin === true ? 'Sign In' : 'Register' }
        </div>
        <TextField id="standard-basic" label="Username" value={username} onChange={ handleUsernameChange } />
        <TextField id="standard-password-input" label="Password" type="password" value={password} onChange={ handlePasswordChange } />
        <Button className={classes.button} variant="contained" color="primary" onClick={ handleButtonClicked }>Go!</Button>
      </form>
    </div>
  );
}