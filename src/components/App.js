import React from 'react';
import Header from './common/header';
import Login from './login';
import Navbar from './common/navbar';

class App extends React.Component {

  state = {
    user: null,
    isLoggedIn: false
  }

  setLoggedIn = (user) => {
    this.setState({
      user: user,
      isLoggedIn: true
    });
  }

  setLoggedOut = () => {
    this.setState({
      user: null,
      isLoggedIn: false
    });
  }

  render() {
    const body = (this.state.isLoggedIn) ? <div><Navbar user={this.state.user} setLoggedOut={this.setLoggedOut}/>{this.props.children}</div> : <Login setLoggedIn={this.setLoggedIn}/>;
    return(
      <div className='container-fluid'>
        <Header />
        {body}
      </div>
    );
  }
}

export default App;
