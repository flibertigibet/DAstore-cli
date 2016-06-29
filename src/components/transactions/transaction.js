import React from 'react';
import Relay from 'react-relay';
import {ListGroupItem, Button} from 'react-bootstrap';
import moment from 'moment';

import Loading from '../common/loading';

import UpdateItemMutation from '../../mutations/updateItemMutation';
import CancelTransactionMutation from '../../mutations/cancelTransactionMutation';

class Transaction extends React.Component {

  state = {
    userId: localStorage.getItem('userId'),
    loading: false
  };

  handleOrderComplete = () => {
    this.setLoading(true);
    this.props.handleMutation(
      new UpdateItemMutation({
        id: this.props.rootQ.itemId,
        status: 'sold',
        store: this.props.store
      }), () => {this.setLoading(false)}
    );
  }

  handleCancelTransaction = () => {
    this.setLoading(true);
    this.props.handleMutation(
      new CancelTransactionMutation({
        id: this.props.rootQ.id,
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
    let buttons;
    if (this.props.rootQ.item.status !== 'sold') {
      buttons =
      <div style={{ display: 'flex', justifyContent: 'space-between', minWidth: '100px', alignItems: 'center'}}>
        <div style={{ display: 'flex', flexDirection: 'column'}}>
          {(this.props.rootQ.sellerId === this.state.userId) ? <Button style={{ marginBottom: '10px' }} bsStyle='info' onClick={this.handleOrderComplete}>Order complete</Button> : null}
          <Button onClick={this.handleCancelTransaction} bsStyle='danger'>Cancel</Button>
        </div>
        {this.state.loading && <div style={{ }}><Loading /></div>}
      </div>
    } else {
        buttons =
        <div style={{ display: 'flex', justifyContent: 'center', minWidth: '150px'}}>
          {(this.props.rootQ.sellerId === this.state.userId) ? <Button bsStyle='info' disabled>Sold</Button> : <Button bsStyle='info' disabled>Bought</Button>}
        </div>
    }
    return(
      <ListGroupItem header={this.props.rootQ.item.name}>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between', alignItems: 'center', paddingLeft: '10px', paddingRight: '10px'}}>
          <a href={this.props.rootQ.item.pictureUrl}><img src={`${this.props.rootQ.item.pictureUrl.slice(0,54)}c_limit,h_150,w_150/${this.props.rootQ.item.pictureUrl.slice(54)}`} style={{ width: '50px'}}/></a>
          <div style={{paddingLeft: '50px', minWidth: '400px', maxWidth: '400px'}}>
            {(this.props.rootQ.sellerId !== this.state.userId) && <div><p>Seller: {this.props.rootQ.seller.name} {' | '} ID: {this.props.rootQ.seller.studentId}</p> <p>Room: {this.props.rootQ.seller.roomNo} {' | '} Phone: {this.props.rootQ.seller.phone}</p></div>}
            {(this.props.rootQ.sellerId === this.state.userId) && <div><p>Buyer: {this.props.rootQ.buyer.name} {' | '} ID: {this.props.rootQ.buyer.studentId} </p> <p> Room: {this.props.rootQ.buyer.roomNo} {' | '} Phone: {this.props.rootQ.buyer.phone}</p></div>}
            <p>Date: {moment(new Date(this.props.rootQ.timestamp)).format('DD-MM-YYYY (hh:mm a)')} {' | '} Price: {this.props.rootQ.item.price} ₹</p>
          </div>
          {buttons}
        </div>
      </ListGroupItem>
    );
  }
}

Transaction = Relay.createContainer(Transaction, {
  fragments: {
    rootQ: () => Relay.QL`
      fragment on Transaction {
        id
        itemId
        sellerId
        buyerId
        item {
          name
          status
          price
          pictureUrl
        }
        seller {
          studentId
          name
          roomNo
          phone
        }
        buyer {
          studentId
          name
          roomNo
          phone
        }
        timestamp
      }
    `
  }
})

export default Transaction;
