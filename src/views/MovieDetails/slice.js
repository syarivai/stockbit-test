import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  movieDetail: null,
};

export const movieDetailReducer = createSlice({
  name: 'movieDetailReducer',
  initialState,
  reducers: {
    setMovieDetail: (state, action) => {
      state.movieDetail = action.payload;
    },
  },
});

export const { setMovieDetail } = movieDetailReducer.actions;

export default movieDetailReducer.reducer;
