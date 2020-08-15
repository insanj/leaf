import React from 'react';
import preval from 'preval.macro';
import { makeStyles } from '@material-ui/core/styles';

import love from '../img/00ca472cc3ffe59c94e540450c11b2c3.png';

const useStyles = makeStyles({
  footer: {
    width: '94%',
    textAlign: 'center',
    padding: 10,
    color: "rgba(255,255,255,0.1)",
    fontSize: '0.8em',
    fontFamily: 'monospace'
  },
  image: {
    width: '10px',
    height: '10px',
    objectFit: 'contain',
  }
});

export default function LeafFooter() {
  const classes = useStyles();
  let compileDateString = preval`module.exports = new Date().toLocaleString("en").toLowerCase();`;
  let gitTagVersionString = process.env.REACT_APP_LEAF_TAG;

  return (
    <footer className={classes.footer}>
      v{ gitTagVersionString } ({ compileDateString })
      <br/>
      &copy; 2020 <a href="http://github.com/insanj" style={{color: 'inherit'}}>julian (insanj) weiss</a>. made with <img className={classes.image} src={love} alt="love" /> in philly
    </footer>
  );
}

