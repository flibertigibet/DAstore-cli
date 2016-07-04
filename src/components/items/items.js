import React from 'react';
import Relay from 'react-relay';

import {ListGroup} from 'react-bootstrap';

import Item from './Item';

class Items extends React.Component {

  static propTypes = {
    store: React.PropTypes.object.isRequired,
    edges: React.PropTypes.array.isRequired,
    sellerVisible: React.PropTypes.bool
  }

  static defaultProps = {
    sellerVisible: false
  }

  render() {
    const {sellerVisible, edges} = this.props;
    return(
      <div>
        <ListGroup style={{ overflowY: 'scroll', maxHeight: '1000px' }}>
          {(edges.length) ? edges.map((edge) => <Item handleMutation={this.props.handleMutation} key={edge.node.id} store={this.props.store} itemData={edge.node} sellerVisible={sellerVisible}/>) : <p style={{color: 'white'}}>No items at this time!</p>}
        </ListGroup>
      </div>
    );
  }
}

export default Items;
