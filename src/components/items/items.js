import React from 'react';
import Relay from 'react-relay';

import {ListGroup} from 'react-bootstrap';

import Item from './Item';
import AddItem from './addItem';

class Items extends React.Component {

  setLimit = (e) => {
    let newLimit = Number(e.target.value);
    this.props.setVariables({
      limit: newLimit
    });
  }

  static propTypes = {
    edges: React.PropTypes.array.isRequired,
    sellerVisible: React.PropTypes.boolean,
    defaultValue: React.PropTypes.number.isRequired,
    setVariables: React.PropTypes.func.isRequired,
  }

  static defaultProps = {
    sellerVisible: false
  }

  render() {
    const {edges, sellerVisible} = this.props;
    return(
      <div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <h4>My items page</h4>
          <select onChange={this.setLimit} defaultValue={this.props.defaultValue} style={{margin: '0 10px'}}>
            <option value='5'>5</option>
            <option value='10'>10</option>
            <option value='20'>20</option>
          </select>
        </div>
        <AddItem store={this.props.rootQ}/>
        <ListGroup style={{ overflowY: 'scroll', maxHeight: '320px' }}>
          {edges.map((edge) => <Item key={edge.node.id} itemData={edge.node} sellerVisible={sellerVisible}/>)}
        </ListGroup>
      </div>
    );
  }
}

export default Items;
