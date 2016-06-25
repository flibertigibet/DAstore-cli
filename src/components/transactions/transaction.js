import React from 'react';
import Relay from 'react-relay';
import {ListGroupItem} from 'react-bootstrap';

class Transaction extends React.Component {
  render() {
    return(
      <ListGroupItem header={this.props.rootQ.itemName}>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: '10px', paddingRight: '10px'}}>
          <a href={this.props.rootQ.itemPictureUrl}><img src={this.props.rootQ.itemPictureUrl} style={{ width: '50px'}}/></a>
          <div style={{paddingLeft: '50px'}}>
            <p>Seller: {this.props.rootQ.sellerName}</p>
            <p>Buyer: {this.props.rootQ.buyerName}</p>
            <p>Timestamp: {this.props.rootQ.timestamp}</p>
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
        buyerName
        timestamp
      }
    `
  }
})

export default Transaction;
