import React from 'react';
import Request from 'superagent';
import toastr from 'toastr';

import {SERVER_URL} from '../../helpers/constants';

import {Button, FormControl} from 'react-bootstrap';

class Login extends React.Component {

  state = {
    id: '',
    password: ''
  };

  onChangeId = (e) => {
    this.setState({
      id: e.target.value
    });
  }

  onChangePassword = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  loginHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: `${this.state.id}@daiict.ac.in`,
      password: `${this.state.password}`
    }
    // console.log(userData);
    try {
      toastr.warning('Logging In');
      var response = await Request.post(`${SERVER_URL}/api/students/login`)
        .set('Content-Type', 'application/json')
        .send(JSON.stringify(userData));
    } catch(err) {
      toastr.error(err);
      throw (err);
    }
    const user = JSON.parse(response.text);
    this.props.setLoggedIn(user);
    toastr.remove();
    toastr.success('Logged In');
  }

  render() {
    return(
      <form style={{width: '300px', margin: '0 auto', padding: '50px', borderRadius: '10px', borderStyle: 'solid', borderColor: 'rgba(0,0,0,0.2)', borderWidth: '1px'}}>
        <FormControl className='textInput' type='text' onChange={this.onChangeId} placeholder='Enter Id'/>
        <FormControl className='textInput' type='password' onChange={this.onChangePassword} placeholder='Enter password'/>
        <Button bsStyle='primary' className='textInput' type='submit' onClick={this.loginHandler}>Login</Button>
      </form>
    );
  }
}

export default Login;
