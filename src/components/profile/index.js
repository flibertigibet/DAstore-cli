import React from 'react';
import Relay from 'react-relay';
import EditProfile from './editProfile';

class Profile extends React.Component {

  componentWillMount() {
    this.props.relay.setVariables({
      id: sessionStorage.getItem('userId')
    });
  }

  render() {
    return(
      <div>
        <h3>Profile page</h3>
        <EditProfile student={this.props.rootQ.student}/>
      </div>
    );
  }
}

Profile = Relay.createContainer(Profile, {
  initialVariables: {
    id: sessionStorage.getItem('userId')
  },
  fragments: {
    rootQ: () => Relay.QL`
      fragment on Store {
        student(sellerId: $id) {
          name
          phone
          roomNo
        }
      }
    `
  }
});

export default Profile;
