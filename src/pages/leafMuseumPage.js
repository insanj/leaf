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

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
  },
  subtitleElement: {
    margin: 0,
  },
  grid: {
    padding: 5,
    marginTop: 5
  } 
}));

export default function LeafMuseumPage() {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = React.useState('everything');

  const generateCardForItem = (item) => {
    const subtitle = (
      <table style={{
        tableLayout: 'fixed'
      }}>
        <tr className={classes.subtitleElement}>
          <td>
            <LocationOnIcon />
          </td>
          <td>
            {item.location}
          </td>
        </tr>

        <tr className={classes.subtitleElement}>
          <td>
            <ScheduleIcon />
          </td>
          <td>
            {item.time}
          </td>
        </tr>

        <tr className={classes.subtitleElement}>
          <td>
            <AttachMoneyIcon />
          </td>
          <td>
            {item.price}
          </td>
        </tr>
      </table>
    );

    return (
      <LeafMuseumCard 
        title={ item.title }
        subtitle={ subtitle }
        image={ item.image }
        clip={ item.clip }
        transform={ item.transform }
      />
    );
  }

  const generateCards = () => {
    const fishes = dayglopterodactyl["Fish"];
    const fishItems = fishes.map(fish => {
      return {
        title: fish["Name"],
        location: fish["Location"],
        time: fish["Time"],
        price: fish["Sell Price"],
      }
    });

    const insects = dayglopterodactyl["Bugs"];
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

    const cards = items.map(i => generateCardForItem(i));
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

      <Grid container className={classes.grid} spacing={2}>
        { generateCards() }
      </Grid>
    </div>
  );
}