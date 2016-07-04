import React from 'react';

class About extends React.Component {
  render() {
    return(
      <div className='bodyText'>
        <h3>About page</h3>
        <p>
          DA Store is a localised olx system for DA-IICT. Students can upload items they want to sell along with the picture and the website will serve
          as a catalog for anybody who is interested in buying the item inside DA-IICT. Since most students stay within campus, exchange of resuable goods becomes
          much easier. Once a student selects an item, both the buyer and the owner will receive a record of the transaction, which they can choose to accept or
          reject. Once the unofficial transaction is complete, the owner of the item can remove the item from the catalog by selecting the complete transaction
          button of the record in the transactions page. Items of cancelled transactions are re-entered in the catalog.
        </p>
        <br />
        <p style={{fontSize: '0.8em'}}>
          Website made for learning purposes and is still under testing. Report bugs at <a href='https://github.com/flibertigibet/DAstore-issues/issues'>github</a>.
        </p>
        <br />
        <br />
      </div>
    );
  }
}

export default About;
