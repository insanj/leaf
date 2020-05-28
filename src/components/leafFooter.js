import React from 'react';
import preval from 'preval.macro';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles({
  footer: {
    width: '94%',
    textAlign: 'center',
    padding: 10,
    color: "rgba(255,255,255,0.1)"
  },
});


export default function LeafFooter() {
  const classes = useStyles();
  let compileDateString = preval`module.exports = new Date().toLocaleString("en").toLowerCase();`;
  return (
    <footer className={classes.footer}>
      updated { compileDateString }
      <br/>
      &copy; 2020 julian (insanj) weiss. made in philly &lt;3
    </footer>
  );
}

