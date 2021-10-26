/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Skeleton } from '@material-ui/lab';

import noMovie from '../../assets/images/noMovie.png';
import { wording } from '../../utils/constants';
import { brokenImg } from '../../utils/helpers';
import { apiGetMovieList } from './api';
import { setMovieList } from './slice';
import './styles.css';

import CustomizedSnackbars from '../../components/Snackbar/Snackbar';
import MyModal from '../../components/MyModal/MyModal';

const useStyles = makeStyles({
  movieImg: {
    objectFit: 'cover',
    marginBottom: 8,
    cursor: 'pointer',
  },
  emptyContainer: {
    height: '90vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
  },
  emptyImg: {
    width: '30vw',
  },
});

const MovieList = (props) => {
  // Props
  const { history } = props;

  // State
  const [page, setPage] = useState(1);
  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isLoadMore, setLoadMore] = useState(false);
  const [imgModal, setImgModal] = useState('');

  // Ref
  const loader = useRef(null);

  const dispatch = useDispatch();
  const classes = useStyles();
  const movieList = useSelector((state) => state.movieList.movieList);
  const totalMovie = useSelector((state) => state.movieList.totalMovie);
  const search = useSelector((state) => state.search.search);

  const fetchMovieList = async (pageProps = 1) => {
    const params = { page: pageProps, search };
    await apiGetMovieList(params).then((response) => {
      setLoading(false);
      setLoadMore(false);
      if (response.Response === 'True') {
        let movies = response.Search;
        if (pageProps > 1) movies = [...movieList, ...response.Search];

        dispatch(
          setMovieList({
            movieList: movies,
            totalMovie: parseInt(response.totalResults),
          }),
        );
      } else {
        dispatch(
          setMovieList({
            movieList: [],
            totalMovie: 0,
          }),
        );
        setAlertMessage(response.Error || wording.internalServerError);
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    // setPage(1);
    // 
    fetchMovieList(1);
  }, [search]);

  // window.onscroll = () => {
  //   const windowHeight =
  //     window.innerHeight + document.documentElement.scrollTop;
  //   const docHeight = document.documentElement.offsetHeight;

  //   if (windowHeight === docHeight) {
  //     if (movieList?.length < totalMovie) {
  //       handleLoadMore();
  //     }
  //   }
  // };

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target?.isIntersecting) handleLoadMore();
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader?.current) observer.observe(loader?.current);
  }, [handleObserver]);

  const handleLoadMore = () => {
    if (movieList?.length < totalMovie) {
      setLoadMore(true);
      setPage(page + 1);
      fetchMovieList(page + 1);
    }
  };


  const renderSkeletonLoading = () =>
    Array(10)
      .fill()
      .map((_, i) => (
        <Grid key={i} item xs={12} md={3} sm={4} className="product-card-grid">
          <Skeleton variant="rect" width="100%" height={300} className="mb-2" />
          <Skeleton variant="rect" width="100%" height={20} className="mb-2" />
          <Skeleton variant="rect" width="30%" height={20} className="mb-2" />
          <Skeleton variant="rect" width="100%" height={35} className="mb-2" />
        </Grid>
      ));

  const renderEmptyList = () => (
    <div className={classes.emptyContainer}>
      <img src={noMovie} alt=" " className={classes.emptyImg} />
      <h3>Movie not found</h3>
    </div>
  );

  const renderMovieList = () => {
    if (isLoading) return renderSkeletonLoading();
    else if (!movieList || movieList.length === 0) return renderEmptyList();
    return movieList?.map((movie, idx) => (
      <Grid
        key={idx}
        item
        xs={12}
        md={3}
        sm={4}
        className="d-flex flex-column product-card-grid"
      >
        <img
          src={movie.Poster}
          alt="movie-img"
          className={classes.movieImg}
          onClick={() => setImgModal(movie.Poster)}
          onError={(e) => brokenImg(e)}
        />
        <span>
          {movie.Title} ({movie.Year})
        </span>
        <Button
          variant="contained"
          color="primary"
          className="mt-2 text-white"
          onClick={() => history.push(`/${movie.imdbID}`)}
        >
          See Detail
        </Button>
      </Grid>
    ));
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        {renderMovieList()}
      </Grid>
      <div ref={loader} />

      {/* Load More */}
      {isLoadMore && (
        <div className="w-100 d-flex justify-content-center my-5">
          <CircularProgress color="primary" />
        </div>
      )}

      {/* Image Modal */}
      <MyModal isOpen={!!imgModal} onHide={() => setImgModal('')}>
        <img src={imgModal} alt=" " />
      </MyModal>

      {/* Snackbar */}
      <CustomizedSnackbars
        open={!!alertMessage}
        position="sticky"
        variant="error"
        message={alertMessage}
        handleClose={() => setAlertMessage('')}
      />
    </div>
  );
};

export default MovieList;
