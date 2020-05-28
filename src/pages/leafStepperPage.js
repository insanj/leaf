import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import LeafStepperItem from '../components/leafStepperItem.js';
import LeafAddButton from '../components/leafAddButton';

import net from '../img/net.png';
import shovel from '../img/shovel.png';
import fishing from '../img/fishing.png';

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

  const handleAddButtonClick = () => {
    let newItemValues = JSON.parse(JSON.stringify(itemValues));
    const itemName = `New Item`;
    newItemValues[itemName] = 0;
    setItemValues(newItemValues);
    setCookieValues(newItemValues);
  }

  // const defaultItems = [(
  //   <LeafStepperItem 
  //     name="Star Net"
  //     image={ net }
  //     value={ getValue("Star Net") } 
  //     minValue={ 0 }
  //     maxValue={ 30 }
  //     onValueChange={ handleValueChange }
  //   />
  // ), (
  //   <LeafStepperItem 
  //     name="Colorful Shovel"
  //     image={ shovel }
  //     value={ getValue("Colorful Shovel") } 
  //     minValue={ 0 }
  //     maxValue={ 30 }
  //     onValueChange={ handleValueChange }
  //   />
  // ), (
  //   <LeafStepperItem 
  //     name="Fish Fishing Rod"
  //     image={ fishing }
  //     value={ getValue("Fish Fishing Rod") } 
  //     minValue={ 0 }
  //     maxValue={ 30 }
  //     onValueChange={ handleValueChange }
  //   />
  // )];

  const handleNameInputChange = (oldName, newName) => {
    let shouldDelete = false;
    if (!newName || newName.length <= 0) {
      shouldDelete = window.confirm("Do you want to delete this item?");
      if (!shouldDelete) {
        return;
      }
    }

    let newItemValues = JSON.parse(JSON.stringify(itemValues));
    // if (newName && newName.length > 0) {
    const oldValue = newItemValues[oldName];
    newItemValues[newName] = oldValue;
    // }

    delete newItemValues[oldName];

    if (shouldDelete) {
      delete newItemValues[newName];
    }

    setItemValues(newItemValues);
    setCookieValues(newItemValues);
  }

  const generateLeafItem = (item) => {
    return (
      <LeafStepperItem 
        name={ item.name }
        image={ item.image }
        value={ item.value }
        minValue={ 0 }
        maxValue={ 30 }
        onValueChange={ handleValueChange }
        onNameInputChange={ (nameInput) => handleNameInputChange(item.name, nameInput) }
      />
    );
  }

  const getItemImage = (name) => {
    const searchText = name.toLowerCase();
    if (searchText.includes("net")) {
      return net;
    } else if (searchText.includes("shovel")) {
      return shovel;
    } else if (searchText.includes("fish")) {
      return fishing;
    }
  }

  const generateLeafItemSection = () => {
    const sorted = Object.keys(itemValues).sort((k1, k2) => itemValues[k2]-itemValues[k1]); //=> k1.toLowerCase().localeCompare(k2.toLowerCase()));

    const saved = sorted.map(i => generateLeafItem({
      name: i,
      image: getItemImage(i),
      value: itemValues[i] ? itemValues[i] : 0
    }));
    // const combo = saved.concat(defaultItems);
    return saved;
  }

  return (
    <div>
      <div>
          { generateLeafItemSection() }
      </div>
      <div>
        <LeafAddButton 
          onButtonClick={ handleAddButtonClick }
        />
      </div>
    </div>
  );
}
