import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import LeafStepperItem from '../components/leafStepperItem.js';
import LeafAddButton from '../components/leafAddButton';

import net from '../img/net.png';
import shovel from '../img/shovel.png';
import fishing from '../img/fishing.png';
import slingshot from '../img/sprites/tiles-3.png';
import can from '../img/sprites/tiles-5.png';
import axe from '../img/sprites/tiles-6.png';
import tile0 from '../img/sprites/tiles-0.png';

import LeafCookies from '../backend/leafCookies';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 10,
    paddingLeft: 10,
    width: '94vw',
  },
  landing: {
    color: '#fff',
    marginBottom: 0,
    marginTop: '30px',
    textAlign: 'center',
    paddingBottom: '50px',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '320px'
  },
  grid: {
    itemsAlign: 'middle'
  }
}));

const COOKIE_LEAF_STEPPER_ITEMS_KEY = "LeafStepperItems";
const getCookieValues = () => {
  const savedStepperItems = LeafCookies.getCookie(COOKIE_LEAF_STEPPER_ITEMS_KEY);
  if (!savedStepperItems) {
    return {};
  }

  try {
    const stepperItemsJSON = JSON.parse(savedStepperItems);
    return stepperItemsJSON;
  } catch (e) {
    return {};
  };
}

const setCookieValues = (values) => {
  const stepperItemsString = JSON.stringify(values);
  LeafCookies.setCookie(COOKIE_LEAF_STEPPER_ITEMS_KEY, stepperItemsString);
}

export default function LeafStepperPage({ searchText }) {
  const classes = useStyles();
  const [itemValues, setItemValues] = React.useState(getCookieValues());
  const theme = useTheme();

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
    let newItemValues = JSON.parse(JSON.stringify(itemValues));
    // if (newName && newName.length > 0) {
    const oldValue = newItemValues[oldName];
    newItemValues[newName] = oldValue;
    // }

    delete newItemValues[oldName];

    setItemValues(newItemValues);
    setCookieValues(newItemValues);
  }

  const handleDeleteButtonClick = (itemName) => {
    let newItemValues = JSON.parse(JSON.stringify(itemValues));

    delete newItemValues[itemName];

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
        onDeleteButtonClick={ () => handleDeleteButtonClick(item.name) }
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
    } else if (searchText.includes("shot")) {
      return slingshot;
    } else if (searchText.includes("can")) {
      return can;
    } else if (searchText.includes("axe")) {
      return axe;
    } else {
      return tile0;
    }
  }

  const generateLeafItemSection = () => {
    let sorted = Object.keys(itemValues).sort((k1, k2) => itemValues[k2]-itemValues[k1]); //=> k1.toLowerCase().localeCompare(k2.toLowerCase()));

    if (searchText && searchText.length > 0) {
      const lowercaseSearch = searchText.toLowerCase();
      sorted = sorted.filter(i => {
        return i.toLowerCase().includes(lowercaseSearch);
      });
    }

    const saved = sorted.map(i => generateLeafItem({
      name: i,
      image: getItemImage(i),
      value: itemValues[i] ? itemValues[i] : 0
    }));
    // const combo = saved.concat(defaultItems);
    return saved;
  }

  return (
    <div className={classes.root}>
      <div>
        <Grid container className={classes.grid} spacing={2}>
          { generateLeafItemSection() }
        </Grid>

        <div style={{width: "100%"}}>
          <p className={classes.landing}>
            <b>Make sure</b> your <img src={net} width="13" height="13" /> nets, <img src={shovel} width="13" height="13" /> shovels, <img src={slingshot} width="13" height="13" /> slingshots, and <img src={fishing} width="13" height="13" /> fishing rods don't break! <b>Add counters</b> for your favorite tools so you know when you have to replace them before they hit 30 uses.
          </p>
        </div>
      </div>
      <div>
        <LeafAddButton 
          onButtonClick={ handleAddButtonClick }
        />
      </div>
    </div>
  );
}
