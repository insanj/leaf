import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import LeafProgressStepper from '../components/leafProgressStepper';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import '../css/leafStepperItem.css';

const useStyles = makeStyles((theme) => ({
  container: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  background: {
    background: '#414241',
    color: '#fff',
    borderRadius: '15px',
    boxShadow: '0px 0px 4px rgba(0,0,0,0.2)',
    marginTop: '10px',
    minWidth: '165px',
    width: '46vw'
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
    margin: 0,
    width: '80%',
    textAlign: 'center',
    background: 'none',
    border: 'none',
    color: '#fff'
  },
  close: {
    background: 'none',
    border: 'none',
    fontSize: '1.1em',
    fontWeight: 500,
    position: 'absolute',
    margin: '15px 0px 0px 5px',
    cursor: 'pointer',
    minWidth: '40px'
  }
}));

export default function LeafStepperItem({ name="Star Net", image='', value=50, minValue=0, maxValue=50, onValueChange, onNameInputChange, onDeleteButtonClick }) {
  const classes = useStyles();

  const [itemName, setItemName] = React.useState(name);

  const handleChange = (event) => {
    setItemName(event.target.value);
  }

  const handleChangeCompleted = (event) => {
    onNameInputChange(itemName);
  }

  const onSubmit = (event) => {
    event.preventDefault();
  }

  const handleValueInputFieldChange = (event) => {
    if (!event.target.value || event.target.value < 1) {
      onValueChange(name, 0);
    } else if (event.target.value > 30 || event.target.value.length > 2) {
      onValueChange(name, 30);
    } else {
      onValueChange(name, event.target.value);
    }
  }

  return (
    <div className={classes.container}>
      <Button color="primary" className={classes.close} onClick={ onDeleteButtonClick }>
        <HighlightOffIcon />
      </Button>

      <center>
        <div className={classes.background}>

          <p className={classes.image}>
            <img src={image} width="50" height="50" alt="Stepper Image"/>
          </p>

          <div className="leafStepperItem-input">
            <form className={classes.name} noValidate autoComplete="off" onSubmit={ onSubmit }>
              <TextField className={classes.input} id="standard-basic" value={ itemName } onChange={ handleChange } onBlur={ handleChangeCompleted } />
            </form>
          </div>

          <input type="number" className={classes.value} value={value} onChange={ handleValueInputFieldChange } />

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