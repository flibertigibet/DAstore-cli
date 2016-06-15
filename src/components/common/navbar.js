import React from 'react';
import {Link} from 'react-router';
import Request from 'superagent';
import toastr from 'toastr';

import {SERVER_URL} from '../../helpers/constants';

class Navbar extends React.Component {

  logoutHandler = async () => {
    try {
      var response = await Request.post(`${SERVER_URL}/api/students/logout?access_token=${this.props.user.id}`);
    } catch(err) {
      throw (err);
      return null;
    }
    this.props.setLoggedOut();
    toastr.remove();
    toastr.success('Logged out');
  };

  render() {
    return(
      <div>
        <nav>
            <Link to='/'>Home</Link>
            { ' | ' }
            <Link to='about'>About</Link>
            { ' | ' }
            <Link to='items'>Items</Link>
            { ' | ' }
            <Link to='/' onClick={this.logoutHandler}>Logout</Link>
        </nav>
      </div>
    );
  }
}

export default Navbar;
