import React from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import { Events } from 'SHARED/constants';

const Button = styled.button`
  padding: 8px 12px;
  font-size: 1.4em;
  border: 1px solid grey;
  border-radius: 3px;
  background-color: transparent;
  cursor: pointer;
`;

export default class RoomsList extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    this.socket = io.connect('http://localhost:3500/1');

    this.socket.on(Events.RECEIVE_MESSAGE, (data) => {
      console.log('received message', data)
      this.setState({
        messages: [
          ...this.state.messages,
          JSON.parse(data)
        ]
      })
    });
  }

  sendMessage = () => {
    this.socket.emit(Events.SEND_MESSAGE, JSON.stringify({
      username: 'saraband',
      content: 'Hello guys, how is it going ?'
    }));
  }

  render () {
    return (
      <div>
        <Button onClick={this.sendMessage}>Send message</Button>
        {this.state.messages.map(({ id, username, content }) => (
          <p key={id}><strong>{username}</strong>: {content}</p>
        ))}
      </div>
    );
  }
}
