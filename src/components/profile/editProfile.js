import React from 'react';
import Request from 'superagent';
import {FormGroup, Button, ControlLabel, FormControl} from 'react-bootstrap';
import Toastr from 'toastr';
import Loading from '../common/loading';

import {SERVER_URL} from '../../helpers/constants';

class EditProfile extends React.Component {

  state = {
    name: (this.props.student && this.props.student.name) || '-',
    phoneNo: (this.props.student && this.props.student.phone) || '-',
    roomNo: (this.props.student && this.props.student.roomNo) || '-',
    loading: false
  };

  // componentDidMount() {
  //   this.setState({
  //     name: (this.props.student && this.props.student.name) || '-',
  //     phoneNo: (this.props.student && this.props.student.phone) || '-',
  //     roomNo: (this.props.student && this.props.student.roomNo) || '-',
  //     loading: false
  //   });
  // }

  componentWillReceiveProps(nextProps) {
    if(this.props !== nextProps) {
      this.setState({
        name: (nextProps.student && nextProps.student.name) || '-',
        phoneNo: (nextProps.student && nextProps.student.phone) || '-',
        roomNo: (nextProps.student && nextProps.student.roomNo) || '-'
      });
    }
  }

  formHandler = async () => {
    this.setState({
      loading: true
    });
    const userData = {
      name: this.state.name,
      phoneNo: this.state.phoneNo,
      roomNo: this.state.roomNo
    };
    try {
      const res = await Request.put(`${SERVER_URL}/api/students/${localStorage.getItem('userId')}?access_token=${localStorage.getItem('jwt')}`)
        .set('Content-Type', 'application/json')
        .send(userData);

      // console.log(JSON.parse(res.text));

      Toastr.success('Details updated!');

      this.setState({
        loading: false
      });

      this.props.setNewUser && this.props.setNewUser(false);

    } catch(err) {
      Toastr.error(err);
      throw new Error(err);
      this.setState({
        loading: false
      });
    }
  }

  changeHandler = (name, e) => {
      var change = {};
      change[name] = e.target.value;
      this.setState(change);
    }

  render() {
    // console.log(this.props);
    return(
      <FormGroup style={{display: 'flex', width: '300px', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', margin: '10px 0 10px 0'}}>
        <ControlLabel>Name</ControlLabel>
        <FormControl
          style={{marginBottom: '5px'}}
          placeholder='Enter your name'
          type='text'
          onChange={this.changeHandler.bind(this, 'name')}
          value={this.state.name}
        />
        <ControlLabel>Phone</ControlLabel>
        <FormControl
          style={{marginBottom: '5px'}}
          placeholder='Enter phone number'
          type='text'
          onChange={this.changeHandler.bind(this, 'phoneNo')}
          value={this.state.phoneNo}
        />
        <ControlLabel>Room No</ControlLabel>
        <FormControl
          style={{marginBottom: '5px'}}
          placeholder='Enter hostel room'
          type='text'
          onChange={this.changeHandler.bind(this, 'roomNo')}
          value={this.state.roomNo}
        />
        <div style={{display: 'flex', minHeight: '50px', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Button style={{marginTop: '15px'}} bsStyle='primary' onClick={this.formHandler}>Update</Button> {' '} {this.state.loading && <Loading />}
        </div>
      </FormGroup>
    );
  }
}

export default EditProfile;
