import {debounce} from 'lodash';

import React from 'react';
import Relay from 'react-relay';

import {FormControl} from 'react-bootstrap';
import Loading from '../common/loading';

import Items from './items';

class AllItems extends React.Component {

  state = {
    text: '',
    loading: false
  }

  constructor(props) {
    super(props);
    this.search = debounce(this.search, 240);
  }

  handleMutation(mutation, cb) {
    Relay.Store.commitUpdate(mutation, {
      onFailure: cb,
      onSuccess: cb
    });
  }

  search = () => {
    this.props.relay.setVariables({
      searchString: this.state.text
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

  handleSearchChange = (e) => {
    this.setState({
      text: e.target.value || null
    });
    this.search();
  }

  setLimit = (e) => {
    let newLimit = Number(e.target.value);
    this.props.relay.setVariables({
      limit: newLimit
    });
  }

  static propTypes = {
    store: React.PropTypes.object.isRequired
  };

  render() {
    const {rootQ} = this.props;
    const {edges} = rootQ.otherItems;
    return(
      <div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <h4 style={{color: 'white'}}>All items</h4>
          <select onChange={this.setLimit} defaultValue={this.props.relay.variables.limit} style={{margin: '0 10px'}}>
            <option value='100'>100</option>
            <option value='200'>200</option>
            <option value='500'>500</option>
          </select>
        </div>
        <div style={{display: 'flex'}}><FormControl style={{width: '200px', margin: '10px', marginLeft: '0px'}} type='text' placeholder='Search items..' onChange={this.handleSearchChange} /> {this.state.loading && <Loading />}</div>
        <Items handleMutation={this.handleMutation} store = {this.props.store} edges={edges} sellerVisible={true}/>
      </div>
    );
  }
}

AllItems = Relay.createContainer(AllItems, {
  initialVariables: {
    limit: 100,
    searchString: null
  },
  fragments: {
    rootQ: () => Relay.QL
    `fragment on Student {
      otherItems(first: $limit, query: $searchString) {
        edges {
          node {
            id
            name
            price
            status
            condition
            reservedToId
            pictureUrl
            seller {
              studentId
              name
              phone
            }
          }
        }
      }
    }`
  }
});

export default AllItems;
