import React from 'react';
import {ListGroupItem} from 'react-bootstrap';

class Item extends React.Component {
  render() {
    return(
      <ListGroupItem header={this.props.itemData.name}>
        Price: {this.props.itemData.price}
        <br />
        Condition: {this.props.itemData.condition}
      </ListGroupItem>
    );
  }
}

export default Item;
