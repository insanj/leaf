import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';

import LeafMuseumCard from '../components/leafMuseumCard';

import iconGrid from '../img/icon_grid.png';

import dayglopterodactyl from '../data/dayglopterodactyl';

import LocationOnIcon from '@material-ui/icons/LocationOn';
import ScheduleIcon from '@material-ui/icons/Schedule';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
    width: '98vw'
  },
  subtitleElement: {
    margin: 0,
  },
  grid: {
    padding: 5,
    marginTop: 5
  } 
}));

export default function LeafMuseumPage({ showOnlyActive=false }) {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = React.useState('everything');

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
    const currentHour = parseInt(moment().format("h"), 10);
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
    const fishes = dayglopterodactyl["Fish"];
    if (showOnlyActive === true) {
      const filtered = fishes.filter(f => filterByActive(f));
      return filtered;
    }

    return fishes;
  }

  const getInsects = () => {
    const bugs = dayglopterodactyl["Bugs"];
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
      items = insectItems.concat(fishItems).sort((i1, i2) => i1.title.localeCompare(i2.title));
    } else if (selectedTab === 'insects') {
      items = insectItems;
    } else if (selectedTab === 'fish') {
      items = fishItems;
    }

    let sortedItems = items;
    if (showOnlyActive === true) {
      sortedItems = items.sort((i1, i2) => {
        return parseInt(i2.price, 10) - parseInt(i1.price, 10);
      });
    }

    const cards = sortedItems.map(i => generateCardForItem(i));
    return cards;
  }

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">      
        <Tabs className={ classes.tabs } value={ selectedTab } onChange={ handleTabChange } aria-label="simple tabs example">
          <Tab label="Everything" value="everything"  />
          <Tab label="Insects" value="insects" />
          <Tab label="Fish" value="fish" />
        </Tabs>
      </AppBar>

      <div style={{marginLeft: '10px', marginRight: '10px'}}>
      <Grid container className={classes.grid} spacing={2}>
        { generateCards() }
      </Grid>
      </div>
    </div>
  );
}