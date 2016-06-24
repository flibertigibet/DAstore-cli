import React from 'react';
import Relay from 'react-relay';
import {ListGroupItem} from 'react-bootstrap';

class Transaction extends React.Component {
  render() {
    return(
      <ListGroupItem>
        <div>
          Item: {this.props.rootQ.itemName}
          <br />
          Seller: {this.props.rootQ.sellerName}
          <br />
          Buyer: {this.props.rootQ.buyerName}
          <br />
          Timestamp: {this.props.rootQ.timestamp}
        </div>
      </ListGroupItem>
    );
  }
}

Transaction = Relay.createContainer(Transaction, {
  fragments: {
    rootQ: () => Relay.QL`
      fragment on Transaction {
        itemName
        sellerName
        buyerName
        timestamp
      }
    `
  }
})

export default Transaction;
