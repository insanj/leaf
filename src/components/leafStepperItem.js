import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

import LeafProgressStepper from '../components/leafProgressStepper';

import '../css/leafStepperItem.css';

const useStyles = makeStyles((theme) => ({
  background: {
    background: '#fff',
    borderRadius: '15px',
    boxShadow: '0px 0px 4px rgba(0,0,0,0.2)',
    margin: '10px',
    maxWidth: '300px'
  },
  image: {
    margin: 0,
    paddingTop: '10px',
  },
  name: {
    fontWeight: 500,
    margin: 0,
  },
  value: {
    fontSize: '3em',
    fontWeight: 100,
    padding: 0,
    margin: 0
  }
}));

export default function LeafStepperItem({ name="Star Net", image='', value=50, minValue=0, maxValue=50, onValueChange, onNameInputChange }) {
  const classes = useStyles();

  const handleChange = (event) => {
    onNameInputChange(event.target.value);
  }

  return (
    <div className={classes.container}>
      <center>
        <div className={classes.background}>
          <p className={classes.image}>
            <img src={image} width="50" height="50" />
          </p>

          <form className={classes.name} noValidate autoComplete="off">
            <TextField className={classes.input} id="standard-basic" value={name} onChange={ handleChange } />
          </form>

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