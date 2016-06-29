import Relay from 'react-relay';

class CancelTransactionMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`
      mutation {
        cancelTransaction
      }
    `
  }

  getVariables() {
    return {
      id: this.props.id
    }
  }

  getFatQuery() {
    return Relay.QL`
      fragment on CancelTransactionPayload {
        store {
          student {
            myItems
            otherItems
            transactions
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
  //   return {};
  // }
}

export default CancelTransactionMutation;
