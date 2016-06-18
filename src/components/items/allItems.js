import React from 'react';
import Relay from 'react-relay';

import Items from './items';

class AllItems extends React.Component {

  render() {
    const {rootQ} = this.props;
    const {edges} = rootQ.otherItems;
    return(
      <div>
        <Items edges={edges} sellerVisible={true} defaultValue={this.props.relay.variables.limit} setVariables={this.props.relay.setVariables}/>
      </div>
    );
  }
}

AllItems = Relay.createContainer(AllItems, {
  initialVariables: {
    limit: 5,
    id: localStorage.getItem('userId')
  },
  fragments: {
    rootQ: () => Relay.QL
    `fragment on Student {
      otherItems(first: $limit, id: $id) {
        edges {
          node {
            id
            name
            price
            condition
            seller {
              name
              phone
            }
          }
        }
      }
    }`
  }
});

export default AllItems;
