import Relay from 'react-relay';

class DeleteItemMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`
      mutation {
        deleteItem
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
      fragment on DeleteItemPayload {
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
  //   return {};
  // }
}

export default DeleteItemMutation;
