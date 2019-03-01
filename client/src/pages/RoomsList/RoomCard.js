import React, { memo } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Routes, { addParamsToUrl } from 'ROUTES';
import { Gutter20, H1 } from 'COMPONENTS/UI/Common';
import FontSizes from 'CONSTANTS/FontSizes';

export default withRouter(memo(({
  id,
  name,
  color,
  usersConnected,
  history
}) => (
  <Container
    color={color}
    onClick={() => history.push(addParamsToUrl(Routes.ROOM, { roomId: id }))}
    >
    <ChannelName>#{name}</ChannelName>
    <ConnectedUsers>{usersConnected} users connected</ConnectedUsers>
  </Container>
)));

const Container = styled.div`
  display: inline-block;
  width: 180px;
  height: 180px;
  cursor: pointer;
  background-color: ${p => p.color};
  ${Gutter20};
  opacity: 0.85;
  transition: opacity 0.15s ease-in-out;
  
  &:hover {
    opacity: 1;
  }
`;

const ConnectedUsers = styled.p`
  color: white;
  font-size: ${FontSizes.SMALL};
`;

const ChannelName = styled(H1)`
  color: white;
  text-overflow: ellipsis;
`;
