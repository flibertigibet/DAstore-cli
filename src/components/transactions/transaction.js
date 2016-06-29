import React from 'react';
import Relay from 'react-relay';
import {ListGroupItem} from 'react-bootstrap';

import moment from 'moment';

class Transaction extends React.Component {
  render() {
    return(
      <ListGroupItem header={this.props.rootQ.itemName}>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: '10px', paddingRight: '10px'}}>
          <a href={this.props.rootQ.itemPictureUrl}><img src={this.props.rootQ.itemPictureUrl} style={{ width: '50px'}}/></a>
          <div style={{paddingLeft: '50px'}}>
            <p>Seller: {this.props.rootQ.sellerName} {' | '} ID: {this.props.rootQ.sellerId} {' | '} Room: {this.props.rootQ.sellerRoomNo}</p>
            <p>Buyer: {this.props.rootQ.buyerName} {' | '} ID: {this.props.rootQ.buyerId} {' | '} Room: {this.props.rootQ.buyerRoomNo}</p>
            <p>Date: {moment(new Date(this.props.rootQ.timestamp)).format('DD-MM-YYYY (hh:mm a)')} {' | '} Price: {this.props.rootQ.price} ₹</p>
          </div>
        </div>
      </ListGroupItem>
    );
  }
}

Transaction = Relay.createContainer(Transaction, {
  fragments: {
    rootQ: () => Relay.QL`
      fragment on Transaction {
        itemPictureUrl
        itemName
        sellerName
        sellerId
        sellerRoomNo
        buyerName
        buyerId
        buyerRoomNo
        timestamp
        price
      }
    `
  }
})

export default Transaction;
