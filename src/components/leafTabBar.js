import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import BookIcon from '@material-ui/icons/Book';
import FaceIcon from '@material-ui/icons/Face';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    left: 0,
    boxShadow: '0px 0px 5px rgba(0,0,0,0.2)'
  },
});

export default function LeafTabBar({ active, onActiveChange }) {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    // setValue(newValue);
    onActiveChange(newValue);
  };

  return (
    <BottomNavigation value={active} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction label="Counters" value="counters" icon={<AddToPhotosIcon />} />
      <BottomNavigationAction label="Active" value="active" icon={<Brightness7Icon />} />
      <BottomNavigationAction label="Museum" value="museum" icon={<BookIcon />} />
      <BottomNavigationAction label="Profile" value="profile" icon={<FaceIcon />} />
    </BottomNavigation>
  );
}