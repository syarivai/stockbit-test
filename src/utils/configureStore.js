import { configureStore } from '@reduxjs/toolkit';

import createReducer from './reducers';

export default function configureAppStore() {
  const store = configureStore({
    reducer: createReducer(),
    devTools: process.env.NODE_ENV !== 'production',
    enhancers: [],
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({}),
  });

  return store;
}
