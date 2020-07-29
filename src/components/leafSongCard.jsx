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

const cssParentWidth = 'calc(99vw - 22px)';
const cssItemMargin = '2px';
const cssItemWidth = `calc(calc(${cssParentWidth} / 4) - ${cssItemMargin})`;

const sizeStyles = {
  maxWidth: 200,
  maxHeight: 200,
  width: cssItemWidth,
  height: cssItemWidth,
};

const useStyles = makeStyles({
  root: {
    margin: cssItemMargin,
    borderRadius: 10,
    cursor: 'pointer',
    ...sizeStyles
  },
  media: {
    zIndex: 0,
    borderRadius: 10,
    position: 'absolute',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    ...sizeStyles
  },
  content: {
    position: 'absolute',
    zIndex: 2,
    ...sizeStyles,
  },
  title: {
    color: 'white',
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: 1,
    textShadow: '0px 0px 5px black',
    textAlign: 'center',
    wordBreak: 'break-all',
    hyphens: 'auto',
    width: '100%',
  },
});

export default function LeafSongCard({ song, onSongClick }) {
  const classes = useStyles();

  const onClick = (event) => {
    onSongClick(song);
  }

  return (
    <div onClick={ onClick }>
      <Card className={classes.root}>
        <div
          className={classes.media}
          style={{
            backgroundImage: `url("${song.image}")`
          }}
          title={ song.name }
          alt={ song.name }
        />
      </Card>

      <div className={classes.title} >
        { song.name }
      </div>
    </div>
  );
}
