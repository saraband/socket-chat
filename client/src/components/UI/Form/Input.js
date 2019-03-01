import React, { memo } from 'react';
import styled from 'styled-components';
import FontSizes from 'CONSTANTS/FontSizes';
import Colors from 'CONSTANTS/Colors';

export default memo((props) => (
  <StyledInput
    {...props}
    />
));

const StyledInput = styled.input`
  padding: 8px 12px;
  font-size: ${FontSizes.NORMAL};
  color: ${Colors.GRISAILLE};
`;
