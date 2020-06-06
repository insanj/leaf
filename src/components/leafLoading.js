import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    textAlign: 'center',
  },
  loading: {
    color: '#ddd',
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
        <img className={classes.image} src="https://66.media.tumblr.com/43548b09ea426b2b6e493f10c2dbd03f/c879795c5eb707a0-1e/s250x400/107c399029e8e3f91d7d5c0f524ddf0bfdb9dcaa.gifv"/>
      </div>
    </div>
  );
}