import React from 'react';
import {ListGroupItem, Button} from 'react-bootstrap';

import Loading from '../common/loading';

import DeleteItemMutation from '../../mutations/deleteItemMutation';
import BuyItemMutation from '../../mutations/buyItemMutation';

class Item extends React.Component {

  state = {
    loading: false
  };

  deleteHandler = () => {
    this.setLoading(true);
    this.props.handleMutation(
      new DeleteItemMutation({
        id: this.props.itemData.id,
        store: this.props.store
      }), () => {this.setLoading(false)}
    );
  }

  buyItemHandler = () => {
    this.setLoading(true);
    this.props.handleMutation(
      new BuyItemMutation({
        itemId: this.props.itemData.id,
        buyerId: localStorage.getItem('userId'),
        store: this.props.store
      }), () => {this.setLoading(false)}
    );
  }

  setLoading = (flag) => {
    this.setState({
      loading: flag
    });
  }

  render() {
    const body = this.props.sellerVisible && <div>Seller: {this.props.itemData.seller.name} {' | '} ID: {this.props.itemData.seller.studentId} {' | '} Phone: {this.props.itemData.seller.phone}</div>

    let button;
    if (this.props.itemData.status === 'available') {
      button = (this.props.sellerVisible) ? <Button bsStyle='primary' onClick={this.buyItemHandler}>Buy Item</Button> : <Button bsStyle='danger' onClick={this.deleteHandler}>Delete</Button>;
    } else {
      button = <Button disabled>Reserved</Button>;
    }

    return(
      <ListGroupItem header={this.props.itemData.name}>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '10px', paddingRight: '10px'}}>
          <a href={this.props.itemData.pictureUrl}><img src={`${this.props.itemData.pictureUrl.slice(0,54)}c_limit,h_150,w_150/${this.props.itemData.pictureUrl.slice(54)}`} style={{ width: '50px'}}/></a>
          <div style={{width: '400px', wordWrap: 'break-word'}}>
            <p>Price: {this.props.itemData.price} ₹</p>
            <p>Description: {this.props.itemData.condition}</p>
            {body}
          </div>
          <div style={{display: 'flex', marginTop: '-20px', minWidth: '100px'}}>
            {button}
            {this.state.loading && <div style={{marginLeft: '-5px'}}><Loading /></div>}
          </div>
        </div>
      </ListGroupItem>
    );
  }
}

export default Item;
