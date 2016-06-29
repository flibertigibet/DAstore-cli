import Relay from 'react-relay';

class TransactionCompleteMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`
      mutation {
        transactionComplete
      }
    `
  }

  getVariables() {
    return {
      id: this.props.id,
      status: this.props.status
    }
  }

  getFatQuery() {
    return Relay.QL`
      fragment on TransactionCompletePayload {
        store {
          student {
            transactions
            myItems
            otherItems
          }
        }
      }
    `
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {store: this.props.store.id}
    }];
  }

  // getOptimisticResponse() {
  //   return {
  //     itemEdge: {
  //       node: {
  //         name: this.props.name,
  //         price: this.props.price,
  //         condition: this.props.condition,
  //         pictureUrl: this.props.pictureUrl,
  //         seller: {
  //           name: 'saving...',
  //           phone: 'saving...'
  //         }
  //       }
  //     },
  //     store: {}
  //   };
  // }
}

export default TransactionCompleteMutation;
