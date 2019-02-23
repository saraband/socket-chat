import React from 'react';
import styled from 'styled-components';
import { Flex } from 'COMPONENTS/UI/Flex';
import Colors from 'CONSTANTS/Colors';
import { H1 } from 'COMPONENTS/UI/Common';

export default class SideBar extends React.PureComponent {
  render () {
    return (
      <Container>
        <H1>Channels</H1>
      </Container>
    );
  }
};

const Container = styled(Flex)`
  width: 200px;
  background-color: ${Colors.ANTI_FLASH_WHITE};
`;