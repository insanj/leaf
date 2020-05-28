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
const useStyles = makeStyles((theme) => ({
  root: {
    width: '48%',
    minWidth: '150px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '5px'
  },
  
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },

}));

export default function LeafMuseumCard({ title, subtitle, image, clip='none', transform='none' }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography component="h5" variant="h5" style={{textAlign: 'center'}}>
          { title }
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          { subtitle }
        </Typography>
      </CardContent>

      <div className={classes.controls}>
        <IconButton aria-label="previous">
          <PlusOneIcon /> 
        </IconButton>
        <IconButton aria-label="next">
           <HelpOutlineIcon /> 
        </IconButton>
      </div>

    </Card>
  );
}