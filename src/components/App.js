import React from 'react';
import Header from './common/header';
import Login from './login';
import Navbar from './common/navbar';

class App extends React.Component {

  componentDidMount() {
    let jwt = localStorage.getItem('jwt');
    console.log(jwt);
    if (jwt !== null) {
      console.log('Came here!');
      this.setLoggedIn({
        id: jwt
      });
    }
  }

  state = {
    user: null,
    isLoggedIn: false
  }

  setLoggedIn = (user) => {
    if(user.id) {
      let jwt = user.id;
      console.log(jwt);
      localStorage.setItem('jwt', jwt);
      localStorage.setItem('userId', user.userId);
      this.setState({
        user: user,
        isLoggedIn: true
      });
    }
  }

  setLoggedOut = () => {
    this.setState({
      user: null,
      isLoggedIn: false
    });
  }

  render() {
    const body = (this.state.isLoggedIn) ? <div><Navbar setLoggedOut={this.setLoggedOut}/>{this.props.children}</div> : <Login setLoggedIn={this.setLoggedIn}/>;
    return(
      <div className='container-fluid'>
        <Header />
        {body}
      </div>
    );
  }
}

export default App;
