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

export default CreateItemMutation;
