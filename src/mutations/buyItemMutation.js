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
        transactionEdge
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
      type: 'RANGE_ADD',
      parentName: 'store',
      parentID: this.props.store.id,
      connectionName: 'transactions',
      edgeName: 'transactionEdge',
      rangeBehaviors: {
        '': 'append'
      }
    }];
  }

  // getOptimisticResponse() {
  //   return {};
  // }
}

export default BuyItemMutation;