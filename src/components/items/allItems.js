import React from 'react';
import Relay from 'react-relay';

import Items from './items';

class AllItems extends React.Component {

  setLimit = (e) => {
    let newLimit = Number(e.target.value);
    this.props.relay.setVariables({
      limit: newLimit
    });
  }

  render() {
    const {rootQ} = this.props;
    const {edges} = rootQ.otherItems;
    return(
      <div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <h4>All items</h4>
          <select onChange={this.setLimit} defaultValue={this.props.relay.variables.limit} style={{margin: '0 10px'}}>
            <option value='5'>5</option>
            <option value='10'>10</option>
            <option value='20'>20</option>
          </select>
        </div>
        <Items edges={edges} sellerVisible={true}/>
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
