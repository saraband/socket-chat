import React, {memo, useState} from 'react';
import styled from 'styled-components';
import Input from 'COMPONENTS/UI/Form/Input';
import Colors from 'CONSTANTS/Colors';
import {Gutter20} from 'COMPONENTS/UI/Common';
import {Flex} from 'COMPONENTS/UI/Flex';
import Mutation from 'react-apollo/Mutation';
import gql from 'graphql-tag';
import { GET_ROOMS_LIST } from './index';

const CREATE_ROOM = gql`
  mutation createRoom ($name: String!) {
    createRoom (name: $name) {
      id
      name
      usersConnected
    }
  }
`;

export default memo(() => {
  const [ newRoomName, setNewRoomName ] = useState('');

  return (
    <Mutation
      mutation={CREATE_ROOM}
      update={(cache, { data: { createRoom } }) => {
        const { roomsList } = cache.readQuery({ query: GET_ROOMS_LIST });
        cache.writeQuery({
          query: GET_ROOMS_LIST,
          data: {
            roomsList: [
              ...roomsList,
              createRoom
            ]
          }
        })
      }}>
      {(createRoom) => (
        <Container>
          <Input
            value={newRoomName}
            onChange={e => setNewRoomName(e.target.value)}
          />
          <button
            onClick={() => {
              if (newRoomName.trim()) {
                createRoom({ variables: { name: newRoomName }});
                setNewRoomName('');
              }
            }}>
          Create room
          </button>
        </Container>
      )}
    </Mutation>
  );
});


const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${Colors.GRISAILLE};
  ${Gutter20};
`;
