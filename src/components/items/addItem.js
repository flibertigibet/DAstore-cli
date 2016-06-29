import React from 'react';
import {FormGroup, Button, FormControl} from 'react-bootstrap';
import Dropzone from 'react-dropzone';

import Loading from '../common/loading';

import Toastr from 'toastr';

import Request from 'superagent';

import Relay from 'react-relay';

import CreateItemMutation from '../../mutations/createItemMutation';

import {SERVER_URL} from '../../helpers/constants';

class AddItem extends React.Component {

  componentWillUnmount() {
    this.removeFailedImage();
  }

  state = {
    files: null,
    url: null,
    publicId: null,
    loading: false
  };

  onDrop = async (files) => {
    // console.log('Received files: ', files);
    this.removeFailedImage();
    this.setState({
      files: files,
      url: null,
      publicId: null
    });
    try {
      const res = await Request.post(`${SERVER_URL}/upload`)
        .attach(files[0].name, files[0]);
      const responseObject = JSON.parse(res.text);
      // console.log(responseObject);
      this.setState({
        url: responseObject.secure_url,
        publicId: responseObject.public_id
      });
      // console.log(responseObject);
    } catch(err) {
      throw(err);
    }
  }

  handleAddItem = () => {
    // console.log(this.refs.itemNameInput);
    if(this.state.url && this.refs.itemNameInput.value && this.refs.itemPriceInput.value && this.refs.itemConditionInput.value) {
      try {
        this.setLoading(true);
        this.props.handleMutation(
          new CreateItemMutation({
            name: this.refs.itemNameInput.value,
            price: this.refs.itemPriceInput.value,
            condition: this.refs.itemConditionInput.value,
            sellerId: localStorage.getItem('userId'),
            pictureUrl: this.state.url,
            publicId: this.state.publicId,
            store: this.props.store
          }), () => {this.setLoading(false)}
        );
      } catch(err) {
        this.removeFailedImage();
        throw(err);
      }
      this.refs.itemNameInput.value='';
      this.refs.itemPriceInput.value='';
      this.refs.itemConditionInput.value='';

      this.setState({
        files: null,
        url: null,
        publicId: null
      });

    } else if(!this.state.url){
        Toastr.warning('Please upload an image');
    } else {
        Toastr.warning('Please fill in all the fields');
        this.removeFailedImage();
        this.setState({
          files: null,
          url: null,
          publicId: null
        });
    }
  }

  setLoading = (flag) => {
    this.setState({
      loading: flag
    });
  }

  removeFailedImage = async () => {
    let res = await Request.post(`${SERVER_URL}/delete`)
      .set({image_id: this.state.publicId});
    // console.log(res);
  }

  render() {
    return(
      <div>
        <FormGroup style={{display: 'flex', width: '600px', justifyContent: 'space-between', margin: '10px 0 10px 0'}}>
          <input
            style={{ margin: 'auto 10px', marginLeft: '0px'}}
            placeholder='Enter new item'
            type='text'
            ref='itemNameInput'
          />
          <input
              style={{ margin: 'auto 10px', marginLeft: '0px'}}
              placeholder='Enter price'
              type='number'
              ref='itemPriceInput'
            />
          <input
              style={{ margin: 'auto 10px', marginLeft: '0px'}}
              placeholder='Enter description'
              type='text'
              ref='itemConditionInput'
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                    this.handleAddItem();
                  }
                }
              }
            />
          <div style={{display: 'flex', minHeight: '50px', minWidth: '100px', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Button onClick={this.handleAddItem}>Add</Button> {this.state.loading && <div style={{marginTop: '-5px'}}><Loading /></div>}
          </div>
        </FormGroup>
        <Dropzone multiple={false} accept='.jpg,.jpeg,.png' onDrop={this.onDrop} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed', borderWidth: '2px', minHeight: '50px', marginBottom: '20px'}}>
          {this.state.files ?
            <div>
              <div>{(this.state.url) ? <img style={{width: '200px'}}src={this.state. files[0].preview} /> : <Loading />}</div>
            </div> :
            <div>Drop a picture of your item, or click to select picture to upload.</div>}
        </Dropzone>
      </div>
    );
  }
}

export default AddItem;
