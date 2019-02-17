import React, { Component } from 'react';

import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

const GET_BOOKS = gql`
  query {
    books {
      id,
      title,
      available
    }
  }
`;

class BookList extends Component {
  render() {
    return (
      <Query query={GET_BOOKS}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div>Loading</div>
          }

          if (error) {
            return <div>Error: {error.toString()}</div>
          }

          console.log(data);

          return (
            <ul>
              {
                data.books.map((b) => {
                  return <div key={b.id}>
                    {`${b.title}: ${b.available ? 'Available' : 'Not Available'}`}
                  </div>
                })
              }
            </ul>
          )
        }}
      </Query>
    );
  }
}

export default BookList;
