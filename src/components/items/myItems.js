import React from 'react';
import Relay from 'react-relay';

import Items from './items';

class MyItems extends React.Component {

  render() {
    const {student} = this.props.rootQ;
    const {edges} =  student.myItems;
    return(
      <div>
        <Items edges={edges} defaultValue={this.props.relay.variables.limit} setVariables={this.props.relay.setVariables}/>
      </div>
    );
  }
}

MyItems = Relay.createContainer(MyItems, {
  initialVariables: {
    limit: 5,
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
