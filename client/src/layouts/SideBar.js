import React from 'react';
import styled from 'styled-components';
import { Flex } from 'COMPONENTS/UI/Flex';
import Colors from 'CONSTANTS/Colors';
import { Gutter20, H1 } from 'COMPONENTS/UI/Common';

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
  flex-direction: column;
  width: 200px;
  background-color: ${Colors.ANTI_FLASH_WHITE};
  ${Gutter20};
`;