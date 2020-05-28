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


const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '150px',
    padding: "10px",
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '5px',
    width: '45vw',
    [theme.breakpoints.up('sm')]: {
      width: '29% !important',
    },
    [theme.breakpoints.up('md')]: {
      width: '20% !important',
    },
    [theme.breakpoints.up('lg')]: {
      width: '18% !important',
    }
  },

  
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },

}));

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function LeafMuseumCard({ item }) {
  const classes = useStyles();
  const theme = useTheme();

  const subtitle = (
    <table style={{
      tableLayout: 'fixed',
      width: '100%',
      textAlign: 'center',
      lineHeight: 1.0,
    }}>
      <tr className={classes.subtitleElement} style={{ fontWeight: 300, fontSize: '1em'}}>
        ${numberWithCommas(item.price)}
      </tr>

      <tr className={classes.subtitleElement} style={{ fontWeight: 400, fontSize: '0.8em' }}>
        {item.location} ({item.time})
      </tr>
    </table>
  );

  return (
    <Card className={classes.root}>
        <Typography style={{textAlign: 'center', fontWeight: 400, fontSize: '1.2em', lineHeight: 1.0}}>
          { item.title }
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          { subtitle }
        </Typography>
    </Card>
  );
}