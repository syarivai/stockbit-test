import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import MyHeader from '../layout/MyHeader/MyHeader';

const browserHistory = createBrowserHistory();
const MovieList = React.lazy(() => import('../views/MovieList'));
const MovieDetails = React.lazy(() => import('../views/MovieDetails'));

const RouterPath = () => (
  <BrowserRouter history={browserHistory}>
    <MyHeader history={browserHistory} />
    <Container className="mt-4">
      <Switch>
        <Route path="/:id" exact component={MovieDetails} />
        <Route path="/" exact component={MovieList} />
      </Switch>
    </Container>
  </BrowserRouter>
);

export default RouterPath;
