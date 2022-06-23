import { jsx } from '@theme-ui/core';
import { Box, BoxProps } from '../Box';
import { layoutMainNoise } from './LayoutMainBody';

export interface LayoutMainFooterProps extends BoxProps {}

export const LayoutMainFooter = (props: LayoutMainFooterProps) => {
  return (
    <Box
      sx={{
        flex: '0 0 auto',
        paddingX: 5,
        paddingTop: 4,
        paddingBottom: 5,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 4,
        background: `${layoutMainNoise}`,
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
      }}
      {...props}
    />
  );
};
