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
      pictureUrl: this.props.pictureUrl,
      sellerId: this.props.sellerId
    }
  }

  getFatQuery() {
    return Relay.QL`
      fragment on CreateItemPayload {
        itemEdge
        store {
          student {
            myItems
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
      connectionName: 'itemConnection',
      edgeName: 'itemEdge',
      rangeBehaviors: {
        '': 'append'
      }
    }];
  }

  // getOptimisticResponse() {
  //   return {
  //     itemEdge: {
  //       node: {
  //         name: this.props.name,
  //         price: this.props.price,
  //         condition: this.props.condition,
  //         seller: {
  //           name: 'saving..',
  //           phone: 'saving..'
  //         }
  //       }
  //     },
  //     store: this.props.store
  //   };
  // }
}

export default CreateItemMutation;
