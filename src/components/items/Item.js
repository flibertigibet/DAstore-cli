import React from 'react';
import {ListGroupItem} from 'react-bootstrap';

class Item extends React.Component {
  render() {
    return(
      <ListGroupItem header={this.props.itemData.name}>
        Price: {this.props.itemData.price}
        <br />
        Condition: {this.props.itemData.condition}
        <br />
        Seller: {this.props.itemData.seller.name} {' | '} Phone: {this.props.itemData.seller.phone}
      </ListGroupItem>
    );
  }
}

export default Item;
