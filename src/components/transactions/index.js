import React from 'react';
import Relay from 'react-relay';
import {ListGroup} from 'react-bootstrap';

import Transaction from './transaction';
import Loading from '../common/loading';

class Transactions extends React.Component{

  state = {
    loading: true
  };

  componentWillMount() {
    this.props.relay.setVariables({
        id: localStorage.getItem('userId')
      }, readyState => {
        if (readyState.done || readyState.aborted) {
          this.setState({loading: false});
        } else if (readyState.error) {
          this.setState({loading: false, error});
        } else {
          this.setState({loading: true});
        }
      }
    );
  }

  render() {
    const {edges} = this.props.rootQ.student.transactions;
    // console.log(transactions);
    const body = (this.state.loading) ? <Loading /> : <ListGroup>{edges.map((edge) => <Transaction key={edge.node.id} rootQ={edge.node} />)}</ListGroup>;
    return(
      <div>
        <h3>Transactions page</h3>
        {body}
      </div>
    );
  }
}

Transactions = Relay.createContainer(Transactions, {
  initialVariables: {
    limit: 100,
    id: 'abcd'
  },
  fragments: {
    rootQ: () => Relay.QL `
      fragment on Store {
        student(sellerId: $id) {
          transactions (first: $limit){
            edges {
              node {
                id
                ${Transaction.getFragment('rootQ')}
              }
            }
          }
        }
      }
    `
  }
});

export default Transactions;
