import React from 'react';
import Relay from 'react-relay';

import Items from './items';
import AddItem from './addItem';

import Loading from '../common/loading';

class MyItems extends React.Component {

  state = {
    loading: true
  };

  handleMutation(mutation) {
    Relay.Store.commitUpdate(mutation);
  }

  componentWillMount() {
    this.props.relay.setVariables({
        id: localStorage.getItem('userId')
      }, readyState => {
        if (readyState.done || readyState.aborted) {
          this.setState({loading: false});
        } else if (readyState.error) {
          this.setState({loading: false, error});
        } else {
          this.setState({loading: true});
        }
      }
    );
  }

  render() {
    const {student} = this.props.rootQ;
    const {edges} =  student.myItems;

    const body = (this.state.loading) ? <Loading /> : <Items handleMutation={this.handleMutation} store={this.props.rootQ} edges={edges} />;
    return(
      <div>
        <h3>Items page</h3>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <h4>Add items</h4>
        </div>
        <AddItem handleMutation={this.handleMutation} store={this.props.rootQ}/>
        {body}
      </div>
    );
  }
}

MyItems = Relay.createContainer(MyItems, {
  initialVariables: {
    limit: 100,
    id: 'abcd'
  },
  fragments: {
    rootQ: () => Relay.QL
    `fragment on Store{
      id
      student(sellerId: $id) {
        myItems(first: $limit) {
          edges {
            node {
              id
              name
              price
              condition
              pictureUrl
              seller {
                name
                phone
              }
            }
          }
        }
      }
    }`
  }
});

export default MyItems;
