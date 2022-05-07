import { jsx } from '@theme-ui/core';
import { HTMLAttributes } from 'react';
import { Box } from '../Box';

export interface CardHeadingProps extends HTMLAttributes<HTMLDivElement> {}

export const CardHeading = ({ children, ...rest }: CardHeadingProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        gap: 2,
        justifyContent: 'space-between',
        paddingLeft: 6,
        paddingRight: 6,
        paddingBottom: 4,
        paddingTop: 6,
        alignItems: 'start'
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};
