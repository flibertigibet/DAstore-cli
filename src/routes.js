import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import Home from './components/home';
import About from './components/about';

const routes =
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='about'component={About} />
  </Route>

export default routes;
