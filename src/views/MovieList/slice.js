import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  movieList: [],
  totalMovie: 0,
};

export const movieListReducer = createSlice({
  name: 'movieListReducer',
  initialState,
  reducers: {
    setMovieList: (state, { payload }) => {
      state.movieList = payload.movieList;
      state.totalMovie = payload.totalMovie;
    },
  },
});

export const { setMovieList } = movieListReducer.actions;

export default movieListReducer.reducer;
