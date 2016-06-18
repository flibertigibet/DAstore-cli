import React from 'react';
import Relay from 'react-relay';

import Items from './items';
import AddItem from './addItem';

class MyItems extends React.Component {

  render() {
    const {student} = this.props.rootQ;
    const {edges} =  student.myItems;
    console.log(edges);
    return(
      <div>
        <h3>Items page</h3>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <h4>Add items</h4>
        </div>
        <AddItem store={this.props.rootQ}/>
        <Items store={this.props.rootQ} edges={edges} />
      </div>
    );
  }
}

MyItems = Relay.createContainer(MyItems, {
  initialVariables: {
    limit: 10,
    id: localStorage.getItem('userId')
  },
  fragments: {
    rootQ: () => Relay.QL
    `fragment on Store{
      id
      student(sellerId: $id) {
        myItems(first: $limit, id: $id) {
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
      }
    }`
  }
});

export default MyItems;
