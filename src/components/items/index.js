import React from 'react';
import Relay from 'react-relay';

import {ListGroup} from 'react-bootstrap';

import Item from './Item';
import AddItem from './addItem';

class Items extends React.Component {

  setLimit = (e) => {
    let newLimit = Number(e.target.value);
    this.props.relay.setVariables({
      limit: newLimit
    });
  }

  render() {
    const {student} = this.props.rootQ;
    const {edges} =  student.myItems;
    return(
      <div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <h4>My items page</h4>
          <select onChange={this.setLimit} defaultValue={this.props.relay.variables.limit} style={{margin: '0 10px'}}>
            <option value='5'>5</option>
            <option value='10'>10</option>
            <option value='20'>20</option>
          </select>
        </div>
        <AddItem store={this.props.rootQ}/>
        <ListGroup style={{ overflowY: 'scroll', maxHeight: '320px' }}>
          {edges.map((edge) => <Item key={edge.node.id} itemData={edge.node} sellerData={student}/>)}
        </ListGroup>
      </div>
    );
  }
}

Items = Relay.createContainer(Items, {
  initialVariables: {
    limit: 5,
    id: localStorage.getItem('userId')
  },
  fragments: {
    rootQ: () => Relay.QL
    `fragment on Store{
      id
      student(sellerId: $id) {
        name
        phone
        myItems(first: $limit, id: $id) {
          edges {
            node {
              id
              name
              price
              condition
            }
          }
        }
      }
    }`
  }
});

export default Items;
