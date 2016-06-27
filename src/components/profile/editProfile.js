import React from 'react';
import Request from 'superagent';
import {FormGroup, Button} from 'react-bootstrap';

import {SERVER_URL} from '../../helpers/constants';

class EditProfile extends React.Component {

  formHandler = async () => {
    const userData = {
      name: this.refs.personNameInput.value,
      phoneNo: this.refs.personPhoneInput.value
    };
    try {
      const res = await Request.put(`${SERVER_URL}/api/students/${localStorage.getItem('userId')}?access_token=${localStorage.getItem('jwt')}`)
        .set('Content-Type', 'application/json')
        .send(userData);

      console.log(JSON.parse(res.text));

      this.refs.personNameInput.value = '';
      this.refs.personPhoneInput.value = '';

      this.props.setNewUser && this.props.setNewUser(false);

    } catch(err) {
      throw new Error(err);
    }
  }

  render() {
    return(
      <FormGroup style={{display: 'flex', height: '100px', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', margin: '10px 0 10px 0'}}>
        <input
          style={{ margin: 'auto 10px', marginLeft: '0px'}}
          placeholder='Enter your name'
          type='text'
          ref='personNameInput'
        />
        <input
          style={{ margin: 'auto 10px', marginLeft: '0px'}}
          placeholder='Enter phone number'
          type='text'
          ref='personPhoneInput'
        />
      <Button onClick={this.formHandler}>Update</Button>
      </FormGroup>
    );
  }
}

export default EditProfile;
