import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import LeafProgressStepper from '../components/leafProgressStepper';

const useStyles = makeStyles((theme) => ({
  background: {
    background: '#fff',
    borderRadius: '15px',
    boxShadow: '0px 0px 4px rgba(0,0,0,0.2)',
    margin: '10px',
    maxWidth: '300px'
  },
  name: {
    fontSize: '2em',
    fontWeight: 500,
    paddingTop: '10px',
    margin: 0
  },
  value: {
    fontSize: '3em',
    fontWeight: 100,
    padding: 0,
    margin: 0
  }
}));

export default function LeafStepperItem({ name="Star Net", value=50, minValue=0, maxValue=50, onValueChange }) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <center>
        <div className={classes.background}>
          <p className={classes.name}>
            { name }
          </p>

          <p className={classes.value}>
            { value }
          </p>

          <LeafProgressStepper
            name={ name }
            activeStep={ value }
            minStep={ minValue }
            maxStep={ maxValue }
            onValueChange={ onValueChange }
          />
        </div>
      </center>
    </div>
  );
}