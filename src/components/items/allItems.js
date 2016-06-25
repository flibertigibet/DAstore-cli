import React from 'react';
import Relay from 'react-relay';

import Items from './items';

class AllItems extends React.Component {

  handleMutation(mutation) {
    Relay.Store.commitUpdate(mutation);
  }

  setLimit = (e) => {
    let newLimit = Number(e.target.value);
    this.props.relay.setVariables({
      limit: newLimit
    });
  }

  static propTypes = {
    store: React.PropTypes.object.isRequired
  };

  render() {
    const {rootQ} = this.props;
    const {edges} = rootQ.otherItems;
    return(
      <div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <h4>All items</h4>
          <select onChange={this.setLimit} defaultValue={this.props.relay.variables.limit} style={{margin: '0 10px'}}>
            <option value='100'>100</option>
            <option value='200'>200</option>
            <option value='500'>500</option>
          </select>
        </div>
        <Items handleMutation={this.handleMutation} store = {this.props.store} edges={edges} sellerVisible={true}/>
      </div>
    );
  }
}

AllItems = Relay.createContainer(AllItems, {
  initialVariables: {
    limit: 100
  },
  fragments: {
    rootQ: () => Relay.QL
    `fragment on Student {
      otherItems(first: $limit) {
        edges {
          node {
            id
            name
            price
            condition
            pictureUrl
            seller {
              name
              phone
            }
          }
        }
      }
    }`
  }
});

export default AllItems;
