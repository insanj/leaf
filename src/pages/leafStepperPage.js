import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import LeafStepperItem from '../components/leafStepperItem.js';

const useStyles = makeStyles((theme) => ({

}));

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

function getCookie(cname) {
  var name = cname + '=';
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

const COOKIE_LEAF_STEPPER_ITEMS_KEY = "LeafStepperItems";
const getCookieValues = () => {
  const savedStepperItems = getCookie(COOKIE_LEAF_STEPPER_ITEMS_KEY);
  if (!savedStepperItems) {
    return {};
  }

  const stepperItemsJSON = JSON.parse(savedStepperItems);
  return stepperItemsJSON;
}

const setCookieValues = (values) => {
  const stepperItemsString = JSON.stringify(values);
  setCookie(COOKIE_LEAF_STEPPER_ITEMS_KEY, stepperItemsString);
}

export default function LeafStepperPage({  }) {
  const classes = useStyles();
  const [itemValues, setItemValues] = React.useState(getCookieValues());

  const getValue = (name) => {
    const cookie = itemValues[name];
    if (!cookie) {
       return 0;
    }

    return parseInt(cookie, 10);
  }

  const handleValueChange = (name, newValue) => {
    let newItemValues = JSON.parse(JSON.stringify(itemValues));
    newItemValues[name] = newValue;
    setItemValues(newItemValues);
    setCookieValues(newItemValues);
  }

  return (
    <div>
      <LeafStepperItem 
        name="Star Net"
        value={ getValue("Star Net") } 
        minValue={0}
        maxValue={50}
        onValueChange={ handleValueChange }
      />
    </div>
  );
}
