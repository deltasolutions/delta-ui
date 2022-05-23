import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Box, BoxProps } from '../Box';

export interface ConfirmHeaderProps extends BoxProps {}

export const ConfirmHeader = forwardRef<HTMLDivElement, ConfirmHeaderProps>(
  (props: ConfirmHeaderProps, ref) => {
    return <Box ref={ref} sx={{ paddingX: 5, paddingTop: 4 }} {...props} />;
  }
);
