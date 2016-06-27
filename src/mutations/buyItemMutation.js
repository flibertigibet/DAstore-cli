import Relay from 'react-relay';

class BuyItemMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`
      mutation {
        buyItem
      }
    `
  }

  getVariables() {
    return {
      itemId: this.props.itemId,
      buyerId: this.props.buyerId
    }
  }

  getFatQuery() {
    return Relay.QL`
      fragment on BuyItemPayload {
        store {
          student {
            myItems
            otherItems
            transactions
          }
          transactionConnection
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

export default BuyItemMutation;
