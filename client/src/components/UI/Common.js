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