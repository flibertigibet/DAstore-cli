import React from 'react';
import {ListGroupItem, Button} from 'react-bootstrap';

import Relay from 'react-relay';

import DeleteItemMutation from '../../mutations/deleteItemMutation';

class Item extends React.Component {

  deleteHandler = () => {
    Relay.Store.commitUpdate(
      new DeleteItemMutation({
        id: this.props.itemData.id,
        store: this.props.store
      })
    );
  }

  render() {
    const body = this.props.sellerVisible && <div>Seller: {this.props.itemData.seller.name} {' | '} Phone: {this.props.itemData.seller.phone}</div>
    return(
      <ListGroupItem header={this.props.itemData.name}>
        Price: {this.props.itemData.price}
        <br />
        Condition: {this.props.itemData.condition}
        <br />
        {body}
        <Button onClick={this.deleteHandler}>Delete</Button>
      </ListGroupItem>
    );
  }
}

export default Item;
