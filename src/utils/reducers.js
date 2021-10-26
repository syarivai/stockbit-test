import { combineReducers } from 'redux';

import searchReducer from '../layout/MyHeader/slice';
import movieListReducer from '../views/MovieList/slice';
import movieDetailReducer from '../views/MovieDetails/slice';

export default function createReducer() {
  const rootReducer = combineReducers({
    movieList: movieListReducer,
    search: searchReducer,
    movieDetail: movieDetailReducer,
  });

  return rootReducer;
}
