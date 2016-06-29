import Relay from 'react-relay';

class UpdateItemMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`
      mutation {
        updateItem
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
      fragment on UpdateItemPayload {
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

export default UpdateItemMutation;
