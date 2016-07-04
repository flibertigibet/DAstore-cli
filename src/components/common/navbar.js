import React from 'react';
import {Link} from 'react-router';
import Request from 'superagent';
import toastr from 'toastr';

import {SERVER_URL} from '../../helpers/constants';

class Navbar extends React.Component {

  logoutHandler = () => {
    this.props.setLoggedOut();
    try {
      Request.post(`${SERVER_URL}/api/students/logout?access_token=${sessionStorage.getItem('jwt')}`)
        .then(() => {
          toastr.remove();
          toastr.success('Logged out');
        });
      sessionStorage.removeItem('jwt');
      sessionStorage.removeItem('userId');
    } catch(err) {
      throw (err);
      toastr.error(err);
    }
  };

  render() {
    return(
      <div style={{backgroundColor: 'white', maxWidth: '370px', padding: '10px', borderRadius: '10px'}}>
        <nav>
            <Link to='/'>Home</Link>
            { ' | ' }
            <Link to='about'>About</Link>
            { ' | ' }
            <Link to='items'>My Items</Link>
            { ' | ' }
            <Link to='transactions'>Transactions</Link>
            { ' | ' }
            <Link to='profile'>Profile</Link>
            { ' | ' }
            <Link to='' onClick={this.logoutHandler}>Logout</Link>
        </nav>
      </div>
    );
  }
}

export default Navbar;
