import React from 'react';
import EditProfile from './editProfile';

class Profile extends React.Component {

  render() {
    return(
      <div>
        <div>Hello world! Render profile info here!</div>
        <EditProfile />
      </div>
    );
  }
}

export default Profile;
