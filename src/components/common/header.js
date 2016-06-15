import React from 'react';
import {Link} from 'react-router';
const Header = () => {
  return(
    <div>
      <nav>
          <Link to='/'>Home</Link>
          { ' | ' }
          <Link to='about'>About</Link>
          { ' | ' }
          <Link to='items'>Items</Link>
      </nav>
      <h2 className='jumbotron' >React relay graphql app</h2>
    </div>
  );
}

export default Header;
