import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

import PlusOneIcon from '@material-ui/icons/PlusOne';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import LocationOnIcon from '@material-ui/icons/LocationOn';
import ScheduleIcon from '@material-ui/icons/Schedule';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import tile0 from '../img/sprites/tiles-0.png';
    
import LeafImageManager from '../backend/leafImageManager';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '65px',
    padding: "10px",
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '5px',

    width: '65px',
    [theme.breakpoints.up('xs')]: {
      width: 'calc(30vw - 20px)',
    },
    [theme.breakpoints.up('sm')]: {
      width: '20vw !important',
    },
    [theme.breakpoints.up('md')]: {
      width: '14vw !important',
    },
    [theme.breakpoints.up('lg')]: {
      width: '10vw !important',
    }
  },
  
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },

  title: {
    textAlign: 'center', 
    fontWeight: 400,
    fontSize: '1.0em', 
    lineHeight: 1.0,
    hyphens: 'auto'


  }
}));

export default function LeafMuseumCard({ item, image=null, onItemIconClick, hasMuseumEntry=false, showLargeThumbnail }) {
  const classes = useStyles();
  const theme = useTheme();

  const getImageForItem = () => {
    if (image) {
      return image;
    }

    return LeafImageManager.getMuseumImageForName(item.title);
  }

  const subtitle = (
    <table style={{
      tableLayout: 'fixed',
      width: '100%',
      textAlign: 'center',
      lineHeight: 1.0,
    }}>
      <tr className={classes.subtitleElement} style={{ fontWeight: 600, fontSize: '0.8em'}}>
        { item.price && item.price.length > 0 ? '$' : '' }{ item.price.replace(" Bells", "") }
      </tr>

      <tr className={classes.subtitleElement} style={{ fontWeight: 400, fontSize: '0.8em' }}>
        {item.location}
      </tr>

      <tr className={classes.subtitleElement} style={{ fontWeight: 400, fontSize: '0.8em', opacity: 0.7 }}>
        {item.time}
      </tr>

      { item.rarity && item.rarity !== "N/A" ? (
        <tr className={classes.subtitleElement} style={{ fontWeight: 400, fontSize: '0.8em', opacity: 0.7 }}>
          {item.rarity}
        </tr>
      ) : ''}
    </table>
  );

  return (
    <Card className={classes.root} style={{opacity: hasMuseumEntry === true ? 0.2 : 1.0}}>
      <center>
        <img src={ item.image ? item.image : getImageForItem() } style={{
          background: 'none',
          borderRadius: '10px',
          objectFit: 'contain',
          cursor: 'pointer',
          width: !showLargeThumbnail ? '62px' : '100px',
          height: !showLargeThumbnail ? '62px' : '100px',
        }} onClick={() => onItemIconClick(item) } />
      </center>
      <Typography className={classes.title}>
        { item.title }
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        { subtitle }
      </Typography>
    </Card>
  );
}