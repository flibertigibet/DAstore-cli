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
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '10px', paddingRight: '10px'}}>
          <a href={this.props.itemData.pictureUrl}><img src={this.props.itemData.pictureUrl} style={{ width: '50px'}}/></a>
          <div style={{width: '400px', wordWrap: 'break-word'}}>
            <p>Price: {this.props.itemData.price} ₹</p>
            <p>Description: {this.props.itemData.condition}</p>
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
