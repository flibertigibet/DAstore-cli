/* eslint-disable no-console */
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import routes from './routes';

import Relay from 'react-relay';

import './styles/style.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';

ReactDOM.render(<Router history={browserHistory} routes={routes}/>, document.getElementById('app'));

console.log(
  Relay.QL`query {
    store {
      itemConnection(first: 5){
        edges {
          node {
            name
            id
          }
        }
      }
    }
  }`
);
