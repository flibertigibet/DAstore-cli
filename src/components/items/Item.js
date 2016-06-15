import React from 'react';
import {ListGroupItem} from 'react-bootstrap';

class Item extends React.Component {
  render() {
    return(
      <ListGroupItem header={this.props.itemData.name}>
        Seller: {this.props.itemData.seller.name}
        <br />
        Phone number: {this.props.itemData.seller.phone}
      </ListGroupItem>
    );
  }
}

export default Item;
