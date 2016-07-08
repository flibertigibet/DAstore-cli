import React from 'react';
import Header from './common/header';
import Login from './login';
import Navbar from './common/navbar';
import EditProfile from './profile/editProfile';

import Request from 'superagent';
import {SERVER_URL} from '../helpers/constants';

class App extends React.Component {

  componentWillMount() {
    Request.get(SERVER_URL).then((obj) => {
      console.log('Server awake!');
    });
    let jwt = sessionStorage.getItem('jwt');
    let userId = sessionStorage.getItem('userId');
    if (jwt !== null) {
      // console.log('Came here!');
      this.setLoggedIn({
        id: jwt,
        userId: userId
      });
    }
  }

  state = {
    user: null,
    isLoggedIn: false,
    newUser: false
  }

  setLoggedIn = (user) => {
    if(user.id) {
      let jwt = user.id;
      sessionStorage.setItem('jwt', jwt);
      sessionStorage.setItem('userId', user.userId);
      this.setState({
        user: user,
        isLoggedIn: true
      });
    }
  }

  setNewUser = (flag) => {
    this.setState({
      newUser: flag
    });
  }

  setLoggedOut = () => {
    this.setState({
      user: null,
      isLoggedIn: false
    });
  }

  render() {
    let body;
    if (this.state.isLoggedIn) {
      body = <div><Navbar setLoggedOut={this.setLoggedOut}/>{this.props.children}</div>;
    } else {
      body = <Login setNewUser={this.setNewUser} setLoggedIn={this.setLoggedIn}/>;
    }
    if (this.state.newUser) {
      body = <div><h6>Please enter the following details before continuing...</h6><EditProfile setNewUser={this.setNewUser}/></div>
    }
    return(
      <div className='container-fluid'>
        <Header />
        {body}
      </div>
    );
  }
}


export default App;
