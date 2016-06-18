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
        Seller: {this.props.sellerData.name} {' | '} Phone: {this.props.sellerData.phone}
      </ListGroupItem>
    );
  }
}

export default Item;
