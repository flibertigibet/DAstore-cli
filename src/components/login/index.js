import React from 'react';
import Request from 'superagent';
import toastr from 'toastr';

class Login extends React.Component {

  loginHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: `${this.refs.inputEmail.value}@daiict.ac.in`,
      password: `${this.refs.inputPassword.value}`
    }
    try {
      toastr.warning('Logging In');
      var response = await Request.post('http://localhost:8000/api/students/login')
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
      <form>
        <p>Email: </p>
        <input className='textInput' type='text' ref='inputEmail' />
        <p>Password: </p>
        <input className='textInput' type='password' ref='inputPassword' />
        <br />
        <input className='textInput' type='submit' onClick={this.loginHandler} />
      </form>
    );
  }
}

export default Login;
