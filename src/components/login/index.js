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
      id: `${this.state.id}`,
      password: `${this.state.password}`
    }
    // console.log(userData);
    let data = null;
    try {
      toastr.warning('Logging In');
       data = await Request.post(`${SERVER_URL}/api/students/authenticate-and-login`)
        .set('Content-Type', 'application/json')
        .send(JSON.stringify(userData));

    } catch(err) {
      toastr.error(err);
      throw (err);
    }
    data = JSON.parse(data.text);
    let user = data.response;
    // console.log(user);
    // console.log(response);
    if(user.userId == null) {
      toastr.remove();
      toastr.success('Welcome new user!');
      this.props.setNewUser(true);
      try {
        const response = await Request.post(`${SERVER_URL}/api/students/login`)
          .set('Content-Type', 'application/json')
          // .set('Set-Cookie': 'mycookie=test')
          .send(JSON.stringify({
            email: `${userData.id}@daiict.ac.in`,
            password: `${userData.password}`
          }));
        user = JSON.parse(response.text);
      } catch(err) {
        throw(err);
      }
    }
    this.props.setLoggedIn(user);
    toastr.remove();
    toastr.success('Logged In');
  }

  render() {
    return(
      <form style={{width: '260px', margin: '100px auto', padding: '30px'}}>
        <FormControl className='textInput' type='text' onChange={this.onChangeId} placeholder='Enter Id'/>
        <FormControl className='textInput' type='password' onChange={this.onChangePassword} placeholder='Enter password'/>
        <Button bsStyle='primary' className='textInput' type='submit' onClick={this.loginHandler}>Login</Button>
      </form>
    );
  }
}

export default Login;
