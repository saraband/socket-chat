import React, { memo } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Routes, { addParamsToUrl } from 'ROUTES';

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
    <h3>#{name}</h3>
    <p>{usersConnected} users connected</p>
  </Container>
)));

const Container = styled.div`
  display: inline-block;
  width: 150px;
  height: 150px;
  background-color: #85144b;
  cursor: pointer;
  padding: 20px;
  font-size: 30px;
  font-weight: lighter;
  font-family: Arial;
  color: white;
  p { font-size: 15px; }
  
  background-color: ${p => p.color};
`;
