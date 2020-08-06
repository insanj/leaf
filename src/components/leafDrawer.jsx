import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import BookIcon from '@material-ui/icons/Book';
import FaceIcon from '@material-ui/icons/Face';
import StorefrontIcon from '@material-ui/icons/Storefront';
import HomeIcon from '@material-ui/icons/Home';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AlbumIcon from '@material-ui/icons/Album';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

export default function LeafDrawer({ open=false, onItemClick, onCloseClick }) {
  const classes = useStyles();

  const toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    onCloseClick();
  };

  const list = (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        <ListItem disabled key={0}>
          <ListItemIcon><div>🐝</div></ListItemIcon>
          <ListItemText primary={'leaf'} />
        </ListItem>
      </List>
      <Divider />

      <List>
        <ListItem button key={1} onClick={() => onItemClick('profile')}>
          <ListItemIcon><FaceIcon /></ListItemIcon>
          <ListItemText primary={'Profile'} />
        </ListItem>

        <Divider />

        <ListItem button key={2} onClick={() => onItemClick('active')}>
          <ListItemIcon><Brightness7Icon /></ListItemIcon>
          <ListItemText primary={'Active'} />
        </ListItem>

        <Divider />

        <ListItem button key={3} onClick={() => onItemClick('museum')}>
          <ListItemIcon><BookIcon /></ListItemIcon>
          <ListItemText primary={'Museum'} />
        </ListItem>

        <ListItem button key={4} onClick={() => onItemClick('shop')}>
          <ListItemIcon><StorefrontIcon /></ListItemIcon>
          <ListItemText primary={'Shop'} />
        </ListItem>

        <ListItem button key={5} onClick={() => onItemClick('songs')}>
          <ListItemIcon><AlbumIcon /></ListItemIcon>
          <ListItemText primary={'Songs'} />
        </ListItem>

        <ListItem button key={5} onClick={() => onItemClick('villagers')}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary={'Villagers'} />
        </ListItem>
      </List>

    </div>
  );

  return (
    <div>
      <React.Fragment key={2}>
        <SwipeableDrawer swipeAreaWidth={0} disableBackdropTransition={false} disableDiscovery={false} open={ open } onClose={ toggleDrawer }>
          { list }
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
