import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

const useStyles = makeStyles({
  root: {
    width: 200,
    height: 200,
  },
  media: {
    height: 200,
    width: 200,
  },
  content: {
    marginTop: -140,
    textAlign: 'center',
    textShadow: '0px 0px 5px black'
  }
});

export default function LeafSongCard({ song, onSongClick }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={ song.image }
          title={ song.name }
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2">
            { song.name }
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button fullWidth size="small" color="primary" variant="text">
          <PlayCircleOutlineIcon />
        </Button>
      </CardActions>
    </Card>
  );
}
