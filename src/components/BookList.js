import React, { Component } from 'react';

import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { Mutation } from "react-apollo";

const CHANGE_AVAILABILITY = gql`
  mutation editBook($id: Int!, $available: Boolean!) {
    editBook(id: $id, available: $available) {
      id,
      available
    }
  }
`;

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
                    <Mutation mutation={CHANGE_AVAILABILITY}>
                      {(changeAvailability, { data }) => (
                        <div>
                          {`${b.title}: ${b.available ? 'Available' : 'Not Available'}`}
                          <button onClick = {(e) => {
                            e.preventDefault();
                            changeAvailability({
                              variables: { id: b.id, available: !b.available }
                            })
                          }}>
                            Change Availability
                          </button>
                        </div>
                      )}
                    </Mutation>
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
