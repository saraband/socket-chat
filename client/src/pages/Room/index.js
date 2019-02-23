import React from 'react';
import styled from 'styled-components';
import {ApolloConsumer, Query, withApollo} from 'react-apollo';
import gql from 'graphql-tag';
import io from 'socket.io-client';
import { Events } from 'SHARED/constants';
import { withRouter } from 'react-router-dom';

const GET_ROOM = gql`
  query getRoom ($roomId: ID!) {
    room (roomId: $roomId) {
      id
      name
      messages {
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
        >
        {({ data, error, loading }) => {
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
              {data.room.messages.map(({ id, username, content}) => <p key={id}>{username}: {content}</p>)}
            </div>
          )
        }}
      </Query>
    );
  }
}

export default withApollo(withRouter(Room));
