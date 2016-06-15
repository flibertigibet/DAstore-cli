import React from 'react';
import {Router, browserHistory, Route, IndexRoute} from 'react-router';
import Relay from 'react-relay';
import App from './App';
import Home from './home';
import About from './about';
import Items from './items';

class RelayRouter extends React.Component {

  constructor(props) {
    super(props);
    // console.log(this.props.store);
  }

  routes() {
    return(
      <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='about'component={About} />
      </Route>
    );
  }

  render() {
    return(
      <div>
      <Router history={browserHistory} routes={this.routes()} />
      <Items itemEdges={this.props.store.itemConnection.edges} />
      </div>
    );
  }
}

RelayRouter = Relay.createContainer(RelayRouter, {
  fragments: {
    store: () => Relay.QL`
    fragment on Store {
      itemConnection(first: 5){
        edges {
          ${Items.getFragment('itemEdges')}
        }
      }
    }`
  }
});

export default RelayRouter;
