import React from 'react';
import AllItems from '../items/allItems';
import Relay from 'react-relay';

class Home extends React.Component {

  render() {
    return(
      <div>
        <h3>Home page</h3>
        <AllItems rootQ={this.props.rootQ.student}/>
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
        id
        student(sellerId: $id) {
          ${AllItems.getFragment('rootQ')}
        }
      }
    `
  }
});

export default Home;
