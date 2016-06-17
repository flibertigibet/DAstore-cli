import Relay from 'react-relay';

class CreateItemMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`
      mutation {
        createItem
      }
    `
  }

  getVariables() {
    return {
      name: this.props.name,
      price: this.props.price,
      condition: this.props.condition,
      sellerId: this.props.sellerId
    }
  }

  getFatQuery() {
    return Relay.QL`
      fragment on CreateItemPayload {
        itemEdge
        store {
          itemConnection
        }
      }
    `
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'store',
      parentID: this.props.store.id,
      connectionName: 'itemConnection',
      edgeName: 'itemEdge',
      rangeBehaviors: {
        '': 'append'
      }
    }];
  }

  getOptimisticResponse() {
    return {
      itemEdge: {
        node: {
          name: this.props.name,
          price: this.props.price,
          condition: this.props.condition,
          seller: {
            name: 'saving..',
            phone: 'saving..'
          }
        }
      }
    };
  }
}

export default CreateItemMutation;
