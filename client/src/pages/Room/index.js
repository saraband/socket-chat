import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import io from 'socket.io-client';
import { withRouter } from 'react-router-dom';

class Room extends React.PureComponent {
  constructor (props) {
    super(props);
  }

  componentDidMount() {
    const { roomId } = this.props.match.params;
    console.log('connecting to room ', roomId);
    this.socket = io(`http://localhost:3500/${roomId}`);
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  render () {
    return (
      <div>
        <h1>Room {this.props.match.params.roomId}</h1>
      </div>
    );
  }
}

export default withRouter(Room);
