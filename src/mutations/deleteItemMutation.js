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
          itemConnection
          student
        }
      }
    `
  }

  getConfigs() {
    return [{
      type: 'RANGE_DELETE',
      parentName: 'store',
      parentID: this.props.store.id,
      connectionName: 'itemConnection',
      deletedIDFieldName: `itemEdge {
        cursor
      }`,
      pathToConnection: ['itemConnection']
    }];
  }

  // getOptimisticResponse() {
  //   return {};
  // }
}

export default DeleteItemMutation;
