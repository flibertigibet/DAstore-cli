import React from 'react';
import Relay from 'react-relay';

class Items extends React.Component {

  constructor(props) {
    super(props);
    console.log(this.props.itemEdges);
  }
  render() {
    return(
      <div>
        <h3>Items page</h3>
      </div>
    );
  }
}

Items = Relay.createContainer(Items, {
  fragments: {
    itemEdges: () => Relay.QL
    `fragment on ItemEdge @relay(plural: true){
        node {
          id
          name
        }
      }`
  }
});

export default Items;
