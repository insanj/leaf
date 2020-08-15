import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';

import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    flexGrow: 1,
    background: 'none'
  },
});

export default function LeafProgressStepper({ name='', activeStep=0, minStep=0, maxStep=30, onValueChange }) {
  const classes = useStyles();
  const theme = useTheme();

  const handleNext = () => {
    const newValue = activeStep + 1;
    onValueChange(name, newValue)
  };

  const handleBack = () => {
    const newValue = activeStep - 1;
    onValueChange(name, newValue);
  };

  return (
    <MobileStepper
      variant="progress"
      steps={ (maxStep-minStep)+1 }
      position="static"
      activeStep={ activeStep }
      className={classes.root}
      nextButton={
        <Button size="large" onClick={handleNext} disabled={activeStep >= maxStep}>
          {theme.direction === 'rtl' ? <IndeterminateCheckBoxIcon /> : <AddBoxIcon />}
        </Button>
      }
      backButton={
        <Button size="large" onClick={handleBack} disabled={activeStep <= minStep}>
          {theme.direction === 'rtl' ? <AddBoxIcon /> : <IndeterminateCheckBoxIcon />}
        </Button>
      }    />
  );
}