import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';

import LeafMuseumCard from '../components/leafMuseumCard';

import iconGrid from '../img/icon_grid.png';

import acnh_fandom_order from '../data/acnh_fandom_order';
import dayglopterodactyl from '../data/dayglopterodactyl';

import LocationOnIcon from '@material-ui/icons/LocationOn';
import ScheduleIcon from '@material-ui/icons/Schedule';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SortIcon from '@material-ui/icons/Sort';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import FontDownloadIcon from '@material-ui/icons/FontDownload';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import FingerprintIcon from '@material-ui/icons/Fingerprint';

import moment from 'moment';

import '../css/leafMuseumPage.css';

const useStyles = makeStyles((theme) => ({
  root: {
    color: '#fff',
    marginTop: 20,
    width: '98vw'
  },
  subtitleElement: {
    margin: 0,
  },
  grid: {
    padding: 5,
    marginTop: 0
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  locationHeader: {
    width: '100%',
    paddingLeft: 10,
    textAlign: 'center',
    fontWeight: 600,
    opacity: 0.6
  },
  cardsHeader: {
    width: '100%', 
    paddingLeft: '5px',
    opacity: 0.6, 
  },
  cardsHeaderText: {
    fontSize: '1.1em',
    fontWeight: 500,
    lineHeight: 0, 
  }
}));

export default function LeafMuseumPage({ searchText, showOnlyActive=false, sortType, onSortTypeChange }) {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = React.useState('everything');
  const theme = useTheme();

  const generateCardForItem = (item) => {
    return (
      <LeafMuseumCard 
        item={ item }
      />
    );
  }

  const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const isInMonthRange = (monthRange) => {
    const currentMonth = moment().format("MMM");
    const monthRangeComponents = monthRange.split(" - ");
    if (monthRangeComponents.length == 1) {
      if (monthRangeComponents[0] != currentMonth) {
        return false;
      }
    } else if (monthRangeComponents.length != 2) {
      return false;
    }

    const firstAllowedMonth = monthRangeComponents[0];
    const lastAllowedMonth = monthRangeComponents[1];

    const monthsPool = allMonths.concat(allMonths);
    const firstAllowedIdx = monthsPool.indexOf(firstAllowedMonth);
    const secondAllowedIdx = monthsPool.slice(firstAllowedIdx).indexOf(lastAllowedMonth) + firstAllowedIdx;

    const allowedMonths = monthsPool.slice(firstAllowedIdx, secondAllowedIdx+1);
    if (!allowedMonths.includes(currentMonth)) {
      return false;
    }

    // let allowedMonths = [];
    // let hitFirstMonth = false;
    // for (let month of allMonths.concat(allMonths)) {
    //   if (month === lastAllowedMonth) {
    //     allowedMonths.push(month);
    //     break;
    //   } else if (month === firstAllowedMonth) {
    //     allowedMonths.push(month);
    //     hitFirstMonth = true;
    //   } else if (hitFirstMonth === true) {
    //     allowedMonths.push(month);
    //   }
    // }

    return true;
  }

  const isInHourRange = (hourRange) => {
    const currentHour = parseInt(moment().format("H"), 10);
    const hourRangeComponents = hourRange.split(" - ");
    if (hourRangeComponents.length != 2) {
      return false;
    }

    const firstAllowedHour = hourRangeComponents[0];

    let firstAllowed24Hr;
    if (firstAllowedHour.includes("am")) {
      firstAllowed24Hr = firstAllowedHour.replace("am", '');
      firstAllowed24Hr = parseInt(firstAllowed24Hr);
    } else if (firstAllowedHour.includes("pm")) {
      firstAllowed24Hr = firstAllowedHour.replace("pm", '');
      firstAllowed24Hr = 12 + parseInt(firstAllowed24Hr, 10);
    }

    const lastAllowedHour = hourRangeComponents[1];
    let lastAllowed24Hour;
    if (lastAllowedHour.includes("am")) {
      lastAllowed24Hour = lastAllowedHour.replace("am", '');
      lastAllowed24Hour = parseInt(lastAllowed24Hour, 10);
    } else if (lastAllowedHour.includes("pm")) {
      lastAllowed24Hour = lastAllowedHour.replace("pm", '');
      lastAllowed24Hour = 12 + parseInt(lastAllowed24Hour, 10);
    }

    let allowedHours = [];
    let hitFirstHour = false;
    for (let i = 0, k = 0; k < 48; k++) {
      if (i == firstAllowed24Hr) {
        allowedHours.push(i);
        hitFirstHour = true;
      } else if (i == lastAllowed24Hour) {
        if (hitFirstHour) {
          allowedHours.push(i);
          break;
        }
      } else if (hitFirstHour == true) {
        allowedHours.push(i);
      }

      if (i >= 24) {
        i = 0;
      } else {
        i = i + 1;
      }
    }

    if (!allowedHours.includes(currentHour)) {
      return false;
    }

    return true;
  }

  const filterByActive = (f) => {
    const duration = f["Duration"];
    if (!duration) {
      return false;
    }

    if (duration.toLowerCase() != "all year") {
      const monthRangeSegments = duration.split("/");
      if (monthRangeSegments.length > 1) {
        const firstMonthRange = monthRangeSegments[0];
        const secondMonthRange = monthRangeSegments[1];
        if (!isInMonthRange(firstMonthRange) && !isInMonthRange(secondMonthRange)) {
          return false;
        }
      } else if (monthRangeSegments.length == 1) {
        const monthRange = monthRangeSegments[0];
        if (!isInMonthRange(monthRange)) {
          return false;
        }
      }
    }

    const time = f["Time"];
    if (!time) {
      return false;
    }

    if (time.toLowerCase() != "all day") {
      const hourRangeSegments = time.split("/");

      if (hourRangeSegments.length > 1) {
        const firstHourRange = hourRangeSegments[0];
        const secondHourRange = hourRangeSegments[1];
        if (!isInHourRange(firstHourRange) && !isInHourRange(secondHourRange)) {
          return false;
        }
      } else if (hourRangeSegments.length == 1) {
        if (!isInHourRange(time)) {
          return false;
        }
      }
    }

    return true;
  }

  const getFishes = () => {
    let fishes = dayglopterodactyl["Fish"];

    if (searchText && searchText.length > 0) {
      const searchLowercase = searchText.toLowerCase();
      fishes = fishes.filter(f => {
        const allValues = Object.values(f).map(v => v.toLowerCase());
        const matchingValues = allValues.filter(v => v.includes(searchLowercase));
        return matchingValues && matchingValues.length > 0;
      });
    }

    if (showOnlyActive === true) {
      const filtered = fishes.filter(f => filterByActive(f));
      return filtered;
    }

    return fishes;
  }

  const getInsects = () => {
    let bugs = dayglopterodactyl["Bugs"];

    if (searchText && searchText.length > 0) {
      const searchLowercase = searchText.toLowerCase();
      bugs = bugs.filter(f => {
        const allValues = Object.values(f).map(v => v.toLowerCase());
        const matchingValues = allValues.filter(v => v.includes(searchLowercase));
        return matchingValues && matchingValues.length > 0;
      });
    }

    if (showOnlyActive === true) {
      const filtered = bugs.filter(f => filterByActive(f));
      return filtered;
    }

    return bugs;
  }

  const generateCards = () => {
    const fishes = getFishes();
    const fishItems = fishes.map(fish => {
      return {
        title: fish["Name"],
        location: fish["Location"],
        time: fish["Time"],
        price: fish["Sell Price"],
      }
    });

    const insects = getInsects();
    const insectItems = insects.map(fish => {
      return {
        title: fish["Name"],
        location: fish["Location"],
        time: fish["Time"],
        price: fish["Sell Price"],
      }
    });

    let items = [];
    if (selectedTab === 'everything') {
      items = insectItems.concat(fishItems);
    } else if (selectedTab === 'insects') {
      items = insectItems;
    } else if (selectedTab === 'fish') {
      items = fishItems;
    }

    let sortedItems = items;
    if ((!sortType && showOnlyActive === true) || (sortType && sortType === 'Price')) {
      sortedItems = items.sort((i1, i2) => {
        return parseInt(i2.price, 10) - parseInt(i1.price, 10);
      });
    } else if ((!sortType && showOnlyActive != true) || (sortType && sortType === 'ID')) {
      const orderedFish = acnh_fandom_order["Fish"].map(f => f.toLowerCase());
      const orderedBugs = acnh_fandom_order["Bugs"].map(f => f.toLowerCase());

      sortedItems = items.sort((i1, i2) => {
        const fishIdx1 = Math.max(orderedFish.indexOf(i1.title.toLowerCase()), 0);
        const fishIdx2 = Math.max(orderedFish.indexOf(i2.title.toLowerCase()), 0);
        const bugIdx1 = Math.max(orderedBugs.indexOf(i1.title.toLowerCase()), 0);
        const bugIdx2 = Math.max(orderedBugs.indexOf(i2.title.toLowerCase()), 0);
        return (fishIdx1 + bugIdx1) - (fishIdx2 + bugIdx2)
      });
    } else if (sortType && sortType === 'Alphabetical') {
      sortedItems = items.sort((i1, i2) => {
        return i1.title.toLowerCase().localeCompare(i2.title.toLowerCase());
      });
    } else if (sortType && sortType === 'Location') {
      sortedItems = items.sort((i1, i2) => {
        return i1.location.toLowerCase().localeCompare(i2.location.toLowerCase());
      });
    }

    let cards = [];
    if (!sortType || sortType != 'Location') {
      cards = sortedItems.map(i => generateCardForItem(i));
    } else {
      let locationsToItems = {};
      for (let item of items) {
        let cardsForLoc = locationsToItems[item.location];
        if (cardsForLoc) {
          cardsForLoc.push(item);
          locationsToItems[item.location] = cardsForLoc;
        } else {
          locationsToItems[item.location] = [item];
        }
      }

      const sortedLocations = Object.keys(locationsToItems).sort();
      for (let location of sortedLocations) {
        const locationItems = locationsToItems[location];
        const locationCards = locationItems.map(i => generateCardForItem(i));
        const locationHeader = (
          <p className={classes.locationHeader}>
            {location}
          </p>
        );
        const locationSection = [locationHeader].concat(locationCards);
        cards = cards.concat(locationSection);
      }


      // let amountOfHeadersAdded = 0;
      // let currLocation = '';
      // for (let i in items) {
      //   const item = items[i];
      //   if (item.location === currLocation) {
      //     continue;
      //   } else {
      //     currLocation = item.location;
          // const header = (
          //   <p className={classes.locationHeader}>
          //     {currLocation}
          //   </p>
          // );
      //     cards.splice(i+amountOfHeadersAdded, 0, header);
      //     amountOfHeadersAdded = amountOfHeadersAdded + 1;
      //   }
      // }
    }

    return cards;
  }

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">      
        <Tabs className={ classes.tabs } value={ selectedTab }  onChange={ handleTabChange } variant="fullWidth" aria-label="tabs">
          <Tab label="Everything" value="everything" />
          <Tab label="Insects" value="insects" />
          <Tab label="Fish" value="fish" />          
        </Tabs>
      </AppBar>

      <div style={{marginLeft: '10px', marginRight: '10px'}}>
        <table style={{tableLayout: 'fixed'}}>
          <tr>
            <td className={classes.cardsHeader }>
              <Typography variant="overline" display="block" className={classes.cardsHeaderText}>
                { generateCards().filter(c => c.type != 'p').length } things
              </Typography>
            </td>

            <td>    
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Sort</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={sortType ? sortType : (showOnlyActive === true ? 'Price' : 'ID')}
                  size="small"
                  label="Sort"
                  onChange={(event) => onSortTypeChange(event.target.value)}
                >
                  <MenuItem value='Alphabetical'><FontDownloadIcon />&nbsp;&nbsp;Alphabetical</MenuItem>
                  <MenuItem value='ID'><FingerprintIcon />&nbsp;&nbsp;ID</MenuItem>
                  <MenuItem value='Location'><LocationOnIcon />&nbsp;&nbsp;Location</MenuItem>
                  <MenuItem value='Price'><LocalOfferIcon />&nbsp;&nbsp;Price</MenuItem>
                </Select>
              </FormControl>

            </td>
          </tr>
        </table>

        <Grid container className={classes.grid} spacing={2}>
          { generateCards() }
        </Grid>
      </div>
    </div>
  );
}