import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
    
import LeafImageManager from '../backend/leafImageManager';

const useStyles = makeStyles((theme) => ({
  root: {
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
    wordBreak: 'break-word',
  }
}));

export default function LeafMuseumCard({ item, image=null, onItemIconClick, hasMuseumEntry=false, showLargeThumbnail }) {
  const classes = useStyles();

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
        { item.price && item.price.length > 0 ? '$' : '' }{ item.price && item.price.length > 0 ? item.price.replace(" Bells", "") : '' }
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

  const handleMuseumCardClick = (event) => {
    onItemIconClick(event, item);
  }

  return (
    <Card className={classes.root} style={{
        minWidth: showLargeThumbnail ? '103px' : '65px',
        opacity: hasMuseumEntry === true ? 0.4 : 1.0
    }} onClick={ handleMuseumCardClick }>
      <center>
        <img src={ item.image ? item.image : getImageForItem() } style={{
          background: 'none',
          borderRadius: '10px',
          objectFit: 'contain',
          cursor: 'pointer',
          width: !showLargeThumbnail ? '62px' : '100px',
          height: !showLargeThumbnail ? '62px' : '100px',
        }}/>
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