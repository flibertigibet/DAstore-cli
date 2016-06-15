import React from 'react';
import Relay from 'react-relay';

import {ListGroup} from 'react-bootstrap';

import Item from './Item';

class Items extends React.Component {

  setLimit = (e) => {
    let newLimit = Number(e.target.value);
    this.props.relay.setVariables({
      limit: newLimit
    });
  }

  render() {
    const {edges} =  this.props.rootQ.itemConnection;
    return(
      <div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <h4>Items page</h4>
          <select onChange={this.setLimit} defaultValue={this.props.relay.variables.limit} style={{margin: '0 10px'}}>
            <option value='5'>5</option>
            <option value='10'>10</option>
            <option value='20'>20</option>
          </select>
        </div>
        <ListGroup style={{ overflowY: 'scroll', height: '320px' }}>
          {edges.map((edge) => <Item key={edge.node.id} itemData={edge.node}/>)}
        </ListGroup>
      </div>
    );
  }
}

Items = Relay.createContainer(Items, {
  initialVariables: {
    limit: 5
  },
  fragments: {
    rootQ: () => Relay.QL
    `fragment on Store{
      itemConnection(first: $limit) {
        edges {
          node {
            id
            name
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

export default Items;
