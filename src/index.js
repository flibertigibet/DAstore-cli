/* eslint-disable no-console */
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import RelayRouter from './components/relayRouter';

import Relay from 'react-relay';

import './styles/style.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';

ReactDOM.render(
  <RelayRouter />,
  document.getElementById('app')
);
