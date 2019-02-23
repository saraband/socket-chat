import React from 'react';
import styled from 'styled-components';
import { Flex } from 'COMPONENTS/UI/Flex';
import SideBar from './SideBar';

export default class DefaultLayout extends React.PureComponent {
  render () {
    return (
      <Container>
        <StyledSideBar />
        <Content>
          {this.props.children}
        </Content>
      </Container>
    );
  }
};

const Container = styled(Flex)`
  min-height: 100vh;
`;

const Content = styled.div`
  flex-grow: 1;
`;

const StyledSideBar = styled(SideBar)`
  flex-grow: 0;
  flex-shrink: 0;
`;