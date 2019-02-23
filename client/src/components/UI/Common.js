import styled, { css } from 'styled-components';
import Colors from 'CONSTANTS/Colors';
import FontSizes from 'CONSTANTS/FontSizes';

const BaseTitle = styled.h1`
  color: ${Colors.PRESTIGE_BLUE};
  font-size: ${FontSizes.MEDIUM};
`;

export const H1 = BaseTitle;

export const H3 = styled(BaseTitle).attrs({
  as: 'h3'
})`
  font-size: ${FontSizes.NORMAL};
`;

export const createCssGutter = (size = 20, axis = 'vertical') => css`
  > * {
    margin: ${size}px;
    margin-${axis === 'horizontal' ? 'left' : 'top'}: 0;
  }
  
  > *:first-child {
    margin-${axis === 'horizontal' ? 'left' : 'top'}: ${size}px;
  }
`;

export const Gutter20 = createCssGutter(20);
export const Gutter40 = createCssGutter(40);