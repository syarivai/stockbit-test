import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Button } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import StarIcon from '@material-ui/icons/Star';

import notFound404 from '../../assets/images/404.png';
import { wording } from '../../utils/constants';
import { brokenImg } from '../../utils/helpers';
import { apiGetMovieDetail } from './api';
import { setMovieDetail } from './slice';

import CustomizedSnackbars from '../../components/Snackbar/Snackbar';

const useStyles = makeStyles({
  movieImg: {
    objectFit: 'cover',
    marginBottom: 12,
    cursor: 'pointer',
  },
  movieTitle: {
    fontSize: 13,
    textTransform: 'uppercase',
    fontWeight: 500,
    color: 'grey',
  },
  movieValue: {
    marginBottom: 15,
  },
  starRating: {
    color: '#f7c13b',
    fontWeight: 600,
  },
  rating: {
    fontSize: 13,
    color: 'grey',
    marginLeft: 8,
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
  const {
    history,
    match: {
      params: { id },
    },
  } = props;

  // State
  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const classes = useStyles();
  const movieDetail = useSelector((state) => state.movieDetail.movieDetail);

  const fetchMovieDetail = async () => {
    const params = { id };
    setLoading(true);
    dispatch(setMovieDetail(null));
    await apiGetMovieDetail(params).then((response) => {
      setLoading(false);
      if (response.Response === 'True') {
        dispatch(setMovieDetail(response));
      } else {
        dispatch(setMovieDetail(null));
        setAlertMessage(response.Error || wording.internalServerError);
      }
    });
  };

  useEffect(() => {
    fetchMovieDetail();
  }, []);

  const renderNotFound = () => (
    <div className={classes.emptyContainer}>
      <img
        src={notFound404}
        alt=" "
        className={classes.emptyImg}
        onError={(e) => brokenImg(e)}
      />
      <h3>Movie not found</h3>
    </div>
  );

  const renderSkeletonLoading = () => (
    <Grid item xs={12}>
      <Skeleton variant="rect" width="80%" height={20} className="mb-2" />
      {/* Ratings */}
      <div className="d-flex align-items-center mb-4">
        <Skeleton variant="rect" width="10%" height={20} className="mb-2" />
      </div>

      {/* Image and Details */}
      <Grid container spacing={4} className="d-flex">
        <Grid item xs={12} sm={6} md={3}>
          <Skeleton variant="rect" width="100%" height={300} className="mb-3" />
        </Grid>
        <Grid item xs={12} sm={6} md={9}>
          <Skeleton variant="rect" width="40%" height={20} className="mb-2" />
          <Skeleton variant="rect" width="50%" height={20} className="mb-2" />
          <Skeleton variant="rect" width="20%" height={20} className="mb-2" />
          <Skeleton variant="rect" width="30%" height={20} className="mb-2" />
          <Skeleton variant="rect" width="60%" height={20} className="mb-2" />
        </Grid>
      </Grid>

      {/* Plot */}
      <Skeleton variant="rect" width="90%" height={20} className="mb-2" />
      <Skeleton variant="rect" width="20%" height={20} className="mb-2" />
    </Grid>
  );

  const renderMovieInfo = (title, value) => (
    <div>
      <div className={classes.movieTitle}>{title}</div>
      <div className={classes.movieValue}>{value}</div>
    </div>
  );

  const renderMovieDetails = () => {
    if (isLoading) return renderSkeletonLoading();
    else if (!movieDetail) return renderNotFound();
    return (
      <Grid item xs={12}>
        <h3>
          {movieDetail?.Title} ({movieDetail?.Year})
        </h3>

        {/* Ratings */}
        <div className="d-flex align-items-center mb-4">
          <StarIcon color="secondary" />
          <span className={classes.starRating}>{movieDetail?.imdbRating}</span>
          <span className={classes.rating}>
            ({movieDetail?.Ratings?.length} Votes)
          </span>
        </div>

        {/* Image and Details */}
        <Grid container spacing={4} className="d-flex">
          <Grid item xs={12} sm={6} md={3}>
            <img
              src={movieDetail?.Poster}
              alt="Movie img"
              className={classes.movieImg}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={9}>
            {renderMovieInfo('Directors', movieDetail?.Director)}
            {renderMovieInfo('Genre', movieDetail?.Genre)}
            {renderMovieInfo('Release Date', movieDetail?.Released)}
            {renderMovieInfo('Box Office', movieDetail?.BoxOffice)}
            {renderMovieInfo('Actors', movieDetail?.Actors)}
          </Grid>
        </Grid>

        {/* Plot */}
        <div className={`${classes.movieTitle} mt-3`}>Plot</div>
        <p>{movieDetail?.Plot}</p>

        {/* Back Button */}
        <Button
          color="primary"
          className="mt-2 text-white"
          onClick={() => history.goBack()}
        >
          Back
        </Button>
      </Grid>
    );
  };

  return (
    <div className={classes.root}>
      <Grid container>{renderMovieDetails()}</Grid>

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
