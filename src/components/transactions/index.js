import React from 'react';
import Relay from 'react-relay';
import {ListGroup} from 'react-bootstrap';

import Transaction from './transaction';

class Transactions extends React.Component{

  componentWillMount() {
    this.props.relay.setVariables({
      id: localStorage.getItem('userId')
    });
  }

  render() {
    const {transactions} = this.props.rootQ;
    // console.log(transactions);
    return(
      <div>
        <h3>Transactions page</h3>
        <ListGroup>
          {transactions.map((transaction) => <Transaction key={transaction.id} rootQ={transaction} />)}
        </ListGroup>
      </div>
    );
  }
}

Transactions = Relay.createContainer(Transactions, {
  initialVariables: {
    id: localStorage.getItem('userId')
  },
  fragments: {
    rootQ: () => Relay.QL `
      fragment on Store {
        transactions(id: $id) {
          id
          ${Transaction.getFragment('rootQ')}
        }
      }
    `
  }
});

export default Transactions;
