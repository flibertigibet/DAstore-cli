import React from 'react';
import {Router, browserHistory, Route, IndexRoute, applyRouterMiddleware} from 'react-router';
import Relay from 'react-relay';
import App from './App';
import Home from './home';
import About from './about';
import Items from './items';

import {SERVER_URL} from '../helpers/constants';

import useRelay from 'react-router-relay';

class RelayRouter extends React.Component {

  constructor(props) {
    super(props);
    // console.log(this.props.store);
    Relay.injectNetworkLayer(
      new Relay.DefaultNetworkLayer(`${SERVER_URL}/graphql`)
    );
  }

  routes() {
    return(
      <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='about' component={About} />
        <Route path='items' queries={this.rootQuery()} component={Items} />
      </Route>
    );
  }

  rootQuery() {
    return({
      rootQ: () => Relay.QL`query { store }`
    });
  }

  render() {
    return(
      <div>
      <Router history={browserHistory} render={applyRouterMiddleware(useRelay)} routes={this.routes()} environment={Relay.Store} />
      </div>
    );
  }
}

export default RelayRouter;
