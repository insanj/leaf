import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import loading from '../img/loading.gifv';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    textAlign: 'center',
  },
  loading: {
    fontSize: '2.0em',
    paddingTop: '20vh'
  },
  image: {
    borderRadius: 40
  }
}));

export default function LeafLoading({}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.loading}>
        <img className={classes.image} src={ loading }/>
      </div>
    </div>
  );
}