import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { CircularProgress } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch, useSelector } from 'react-redux';

import { setSearch, setSearchSuggestion } from './slice';
import { apiGetMovieList } from '../../views/MovieList/api';

import CustomizedSnackbars from '../../components/Snackbar/Snackbar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    color: 'white',
    cursor: 'pointer',
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
  suggestionContainer: {
    width: 300,
    border: '1px solid lightgrey',
    backgroundColor: 'white',
    position: 'absolute',
    right: 10,
    zIndex: 100,
  },
  backdrop: {
    position: 'fixed',
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    zIndex: 99,
  },
  suggestionResult: {
    padding: '8px 12px',
    '&:hover': {
      backgroundColor: '#38ab6b',
      color: 'white',
      cursor: 'pointer',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
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
  const [showSuggestionBox, setShowSuggestionBox] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const classes = useStyles();
  const searchSuggestion = useSelector(
    (state) => state.search.searchSuggestion,
  );

  const fetchMovieList = async () => {
    const params = { page: 1, search: searchVal };
    setLoading(true);
    await apiGetMovieList(params).then((response) => {
      setLoading(false);
      if (response.Response === 'True') {
        dispatch(setSearchSuggestion(response.Search));
      } else {
        dispatch(setSearchSuggestion([]));
      }
    });
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchMovieList();
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchVal]);

  const handleKeyDown = (e) => {
    if (e?.keyCode === 13) {
      if (searchVal.length >= 3) {
        dispatch(setSearchSuggestion([]));
        dispatch(setSearch(searchVal));
        if (window.location.pathname?.includes('tt')) {
          setShowSuggestionBox(false);
          history.push('/');
        }
      } else {
        setAlertMessage('Search must be more than 3 words');
      }
    }
  };

  const handleChooseMovie = (id) => {
    setShowSuggestionBox(false);
    history.push(`/${id}`);
  };

  const renderLoadSuggestion = () => (
    <div className="p-3 text-center">
      <CircularProgress size={30} />
    </div>
  );

  const renderEmptySearch = () => (
    <div className="p-3 text-center">Movie not found</div>
  );

  const renderSuggestionBox = () => {
    if (isLoading) return renderLoadSuggestion();
    else if (searchSuggestion?.length === 0) return renderEmptySearch();
    return searchSuggestion?.map((movie, idx) => (
      <div
        key={idx}
        className={classes.suggestionResult}
        onClick={() => handleChooseMovie(movie.imdbID)}
      >
        {movie.Title} ({movie.Year})
      </div>
    ));
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className="d-flex justify-content-between">
          <Typography
            onClick={() => history.replace('/')}
            className={classes.title}
            variant="h6"
            noWrap
          >
            StockFlix
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              onChange={(e) => setSearchVal(e.target.value)}
              // onBlur={() => setShowSuggestionBox(false)}
              onFocus={() => setShowSuggestionBox(true)}
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

      {/* Seach Suggestion */}
      {showSuggestionBox && (
        <>
          <div className={classes.suggestionContainer}>
            {renderSuggestionBox()}
          </div>
          <div className={classes.backdrop} onClick={() => setShowSuggestionBox(false)} />
        </>
      )}

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
