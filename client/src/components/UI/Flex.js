import styled from 'styled-components';

export const Flex = styled.div`
  display: flex;
  flex-direction: ${p => p.dir || 'row'};
  justify-content: ${p => p.justify || 'initial'};
  align-items: ${p => p.align || 'initial'};
`;