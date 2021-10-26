import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';

import Route from './router/routes';
import configureAppStore from './utils/configureStore';
import { setupAxios } from './utils/axiosConfig';

import './App.css';

const LoadingComponent = () => (
  <Backdrop open className="fully-loading">
    <CircularProgress color="inherit" />
  </Backdrop>
);

const App = () => {
  setupAxios(axios);

  const store = configureAppStore();
  const theme = createTheme({
    palette: {
      primary: { main: '#38ab6b' },
      secondary: { main: '#f7c13b' },
    },
  });

  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Suspense fallback={<LoadingComponent />}>
            <Route />
          </Suspense>
        </Provider>
      </MuiThemeProvider>
    </div>
  );
};

export default App;
