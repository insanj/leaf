import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';

import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    cursor: 'pointer',
  },
  title: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    // width: '100%',
    // [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    // },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearIcon: {
    height: '36px',
    width: '36px',
    marginRight: theme.spacing(1),
    marginBottom: 0,
    opacity: 0.8
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    // width: '100%',
    // [theme.breakpoints.up('sm')]: {
      width: '10ch',
      '&:focus': {
        width: '10ch',
      },
    // },
  },
}));

export default function LeafAppBar({ onSearchInputChange, onDrawerClick }) {
  const classes = useStyles();
  const [searchValue, setSearchValue] = React.useState('');

  const handleClearButtonClick = (event) => {
    setSearchValue('');
    onSearchInputChange(null);
  }

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
    onSearchInputChange(event);
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <div className={classes.menuButton} onClick={ onDrawerClick }>
            <MenuIcon />
          </div>

          <Typography variant="h6" className={classes.title}>
            🐝&nbsp;&nbsp;leaf
          </Typography>

          { onSearchInputChange === null ? '' : (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>

              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={ handleSearchInputChange }
                value={ searchValue }
              />
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

/*
            <TextField
              id="standard-textarea"
              type="search"
              margin="normal"
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              InputProps={{ 
                'aria-label' : 'search',
                startAdornment : (
                  <InputAdornment position="start">
                    <div>
                      <SearchIcon />
                    </div>
                  </InputAdornment>
                ),
                endAdornment : (
                  <InputAdornment position="end">
                    <IconButton onClick={ onSearchClearButtonClick }>
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={ onSearchInputChange }
            />
            */
            