import React from 'react';
import styled from 'styled-components';
import {ApolloConsumer, Query, withApollo} from 'react-apollo';
import gql from 'graphql-tag';
import io from 'socket.io-client';
import { Events } from 'SHARED/constants';
import { withRouter } from 'react-router-dom';
import Colors from 'CONSTANTS/Colors';

const GET_ROOM = gql`
  query getRoom ($roomId: ID!, $offset: Int! = 0, $limit: Int! = 5) {
    room (roomId: $roomId) {
      id
      name
      messages (offset: $offset, limit: $limit) {
        id
        username
        content
        createdAt
      }
    }
  }
`;

class Room extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      pendingMessage: ''
    };
  }

  componentDidMount() {
    const { roomId } = this.props.match.params;
    console.log('connecting to room ', roomId);
    this.socket = io(`http://localhost:3500/${roomId}`);

    this.socket.on(Events.RECEIVE_MESSAGE, (message) => {
      const parsedMessage = {
        ...JSON.parse(message),
        __typename: 'Message'
      };

      // Update the room query
      const { room } = this.props.client.readQuery({
        query: GET_ROOM,
        variables: { roomId }
      });

      this.props.client.writeQuery({
        query: GET_ROOM,
        variables: { roomId },
        data: {
          room: {
            ...room,
            messages: [
              ...room.messages,
              parsedMessage
            ]
          }
        }
      });
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  sendPendingMessage = () => {
    this.socket.emit(Events.SEND_MESSAGE, JSON.stringify({
      username: 'sara',
      content: this.state.pendingMessage
    }));
  };

  render () {
    const { roomId } = this.props.match.params;
    return (
      <Query
        query={GET_ROOM}
        variables={{ roomId }}
        fetchPolicy='cache-and-network'
        >
        {({ data, error, loading, fetchMore }) => {
          if (loading) return <p>Loading room {roomId}</p>;
          if (error) return <p>Error loading room {roomId}</p>;

          return (
            <div>
              <h1>#{data.room.name}</h1>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    if (!this.state.pendingMessage.trim()) {
                      return;
                    }

                    this.sendPendingMessage();
                  }}>
                  <input
                    value={this.state.pendingMessage}
                    onChange={(e) => this.setState({ pendingMessage: e.target.value })} />
                  <button type='submit'>Send message</button>
                </form>

              {/* MESSAGES */}
              <LoadMore onClick={() => {
                  fetchMore({
                    variables: {
                      roomId,
                      offset: data.room.messages.length,
                      limit: 5
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult) return prev;

                      console.log(prev)
                      console.log(fetchMoreResult)

                      return {
                        room: {
                          ...prev.room,
                          messages: [
                            ...fetchMoreResult.room.messages,
                            ...prev.room.messages
                          ]
                        }
                      };
                    }
                  })
                }}>
                Load more
              </LoadMore>
              {data.room.messages.map(({ id, username, content}) => <p key={id}>{username}: {content}</p>)}
            </div>
          )
        }}
      </Query>
    );
  }
}

export default withApollo(withRouter(Room));

const LoadMore = styled.div`
  padding: 8px 12px;
  width: 300px;
  background-color: rgba(0, 0, 0, 0.1);
  margin: 10px 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
