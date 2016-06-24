import React from 'react';
import AllItems from '../items/allItems';
import Relay from 'react-relay';

import Loading from '../common/loading';

class Home extends React.Component {

  state = {
    loading: true
  };

  componentWillMount() {
    this.props.relay.setVariables({
        id: localStorage.getItem('userId')
      }, readyState => {
        if (readyState.done || readyState.aborted) {
          this.setState({loading: false});
        } else if (readyState.error) {
          this.setState({loading: false, error});
        } else {
          this.setState({loading: true});
        }
      }
    );
  }

  render() {
    const body = (this.state.loading) ? <Loading /> : <AllItems store={this.props.rootQ} rootQ={this.props.rootQ.student}/>;
    return(
      <div>
        <h3>Home page</h3>
        {body}
      </div>
    );
  }
}

Home = Relay.createContainer(Home, {
  initialVariables: {
    id: localStorage.getItem('userId')
  },
  fragments: {
    rootQ: () => Relay.QL`
      fragment on Store {
        student(sellerId: $id) {
          ${AllItems.getFragment('rootQ')}
        }
      }
    `
  }
});

export default Home;
