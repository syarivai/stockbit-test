import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch } from 'react-redux';

import { setSearch } from './slice';

import CustomizedSnackbars from '../../components/Snackbar/Snackbar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: 'none',
    color: 'white',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
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
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function MyHeader(props) {
  // Props
  const { history } = props;

  // State
  const [searchVal, setSearchVal] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSearch = (isEnter) => {
    if (searchVal.length >= 3) {
      dispatch(setSearch(searchVal));
      if (window.location.pathname?.includes('tt')) {
        history.goBack();
      }
    } else if (isEnter) {
      setAlertMessage('Search must be more than 3 words');
    }
  };

  const handleKeyDown = (e) => {
    if (e?.keyCode === 13) handleSearch(true);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            StockFlix
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              onChange={(e) => setSearchVal(e.target.value)}
              onBlur={() => handleSearch()}
              onKeyDown={(e) => handleKeyDown(e)}
              value={searchVal}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>

      {/* Snackbar */}
      <CustomizedSnackbars
        open={!!alertMessage}
        position="sticky"
        variant="error"
        message={alertMessage}
        handleClose={() => setTimeout(() => setAlertMessage(''), 2000)}
      />
    </div>
  );
}
