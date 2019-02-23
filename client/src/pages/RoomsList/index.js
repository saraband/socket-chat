import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import RoomCard from './RoomCard';
import RoomCardColors from '../../constants/RoomCardColors';

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
              {data.roomsList.map((roomData, index) => (
                <RoomCard
                  key={roomData.id}
                  color={RoomCardColors[index % RoomCardColors.length]}
                  {...roomData}
                  />
              ))}
            </div>
          );
        }}
      </Query>
    );
  }
}
