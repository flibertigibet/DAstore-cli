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
        itemEdge
        store {
          student {
            myItems
          }
        }
        deletedItemID
      }
    `
  }

  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'store',
      parentID: this.props.store.id,
      connectionName: 'itemConnection',
      deletedIDFieldName: 'deletedItemID'
    }];
  }

  // getOptimisticResponse() {
  //   return {};
  // }
}

export default DeleteItemMutation;
