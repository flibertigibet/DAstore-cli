/* eslint-disable no-console */
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import RelayRouter from './components/router';

import Relay from 'react-relay';

import './styles/style.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:8000/graphql')
);

class MainRoute extends Relay.Route {
  static routeName = 'Main';
  static queries = {
    store: (Component) => Relay.QL
      `query {
        store {
          ${Component.getFragment('store')}
        }
      }`
  }
}

ReactDOM.render(
  <Relay.RootContainer
    Component={RelayRouter}
    route={new MainRoute()}
    renderFailure={(err) => {
      console.log('Error in renderFailure', err);
      return (
        <div>
          <p>Something went wrong</p>
        </div>
      );
    }}
  />,
  document.getElementById('app')
);
