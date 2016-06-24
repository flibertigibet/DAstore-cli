import React from 'react';
import {ListGroupItem, Button} from 'react-bootstrap';

import DeleteItemMutation from '../../mutations/deleteItemMutation';
import BuyItemMutation from '../../mutations/buyItemMutation';

class Item extends React.Component {

  deleteHandler = () => {
    this.props.handleMutation(
      new DeleteItemMutation({
        id: this.props.itemData.id,
        store: this.props.store
      })
    );
  }

  buyItemHandler = () => {
    // console.log(this.props);
    this.props.handleMutation(
      new BuyItemMutation({
        itemId: this.props.itemData.id,
        buyerId: localStorage.getItem('userId'),
        store: this.props.store
      })
    );
  }

  render() {
    const body = this.props.sellerVisible && <div>Seller: {this.props.itemData.seller.name} {' | '} Phone: {this.props.itemData.seller.phone}</div>
    return(
      <ListGroupItem header={this.props.itemData.name}>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <div>
            Price: {this.props.itemData.price} ₹
            <br />
            Description: {this.props.itemData.condition}
            <br />
            {body}
          </div>
          <div style={{marginTop: '-20px'}}>
            {!this.props.sellerVisible && <Button bsStyle='danger' onClick={this.deleteHandler}>Delete</Button>}
            {this.props.sellerVisible && <Button bsStyle='primary' onClick={this.buyItemHandler}>Buy Item</Button>}
          </div>
        </div>
      </ListGroupItem>
    );
  }
}

export default Item;
