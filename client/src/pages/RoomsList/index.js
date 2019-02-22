import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import RoomCard from './RoomCard';

const GET_ROOMS_LIST = gql`
  query roomsList {
    roomsList {
      id
      name
      usersConnected
    }
  }
`;

export default class RoomsList extends React.PureComponent {
  render () {
    return (
      <Query query={GET_ROOMS_LIST}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading rooms list</p>;
          if (error) return <p>Error loading rooms list</p>;

          return (
            <div>
              {data.roomsList.map((roomData) => (
                <RoomCard key={roomData.id} {...roomData} />
              ))}
            </div>
          );
        }}
      </Query>
    );
  }
}

const Button = styled.button`
  padding: 8px 12px;
  font-size: 1.4em;
  border: 1px solid grey;
  border-radius: 3px;
  background-color: transparent;
  cursor: pointer;
`;
