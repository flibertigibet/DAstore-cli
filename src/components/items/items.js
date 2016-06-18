import React from 'react';
import Relay from 'react-relay';

import {ListGroup} from 'react-bootstrap';

import Item from './Item';
import AddItem from './addItem';

class Items extends React.Component {

  static propTypes = {
    edges: React.PropTypes.array.isRequired,
    sellerVisible: React.PropTypes.boolean
  }

  static defaultProps = {
    sellerVisible: false
  }

  render() {
    const {edges, sellerVisible} = this.props;
    return(
      <div>
        <AddItem store={this.props.rootQ}/>
        <ListGroup style={{ overflowY: 'scroll', maxHeight: '320px' }}>
          {edges.map((edge) => <Item key={edge.node.id} itemData={edge.node} sellerVisible={sellerVisible}/>)}
        </ListGroup>
      </div>
    );
  }
}

export default Items;
