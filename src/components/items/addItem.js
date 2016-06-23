import React from 'react';
import {Button} from 'react-bootstrap';

import Relay from 'react-relay';

import CreateItemMutation from '../../mutations/createItemMutation';

class AddItem extends React.Component {

  handleAddItem = () => {
    Relay.Store.commitUpdate(
      new CreateItemMutation({
        name: this.refs.itemNameInput.value,
        price: this.refs.itemPriceInput.value,
        condition: this.refs.itemConditionInput.value,
        sellerId: localStorage.getItem('userId'),
        store: this.props.store
      })
    );
    this.refs.itemNameInput.value='';
    this.refs.itemPriceInput.value='';
    this.refs.itemConditionInput.value='';
  }

  render() {
    return(
      <div style={{display: 'flex', width: '600px', justifyContent: 'space-between', margin: '10px 0 10px 0'}}>
        <input
          style={{ margin: 'auto 10px', marginLeft: '0px'}}
          placeholder='Enter new item'
          type='text'
          ref='itemNameInput'
        />
        <input
            style={{ margin: 'auto 10px', marginLeft: '0px'}}
            placeholder='Enter price'
            type='text'
            ref='itemPriceInput'
          />
        <input
            style={{ margin: 'auto 10px', marginLeft: '0px'}}
            placeholder='Enter condition'
            type='text'
            ref='itemConditionInput'
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                  this.handleAddItem();
                }
              }
            }
          />
        <Button onClick={this.handleAddItem}>Add</Button>
      </div>
    );
  }
}

export default AddItem;
