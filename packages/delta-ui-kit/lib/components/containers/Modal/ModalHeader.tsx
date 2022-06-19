import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';
import { Box } from '../Box';

export interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  (props, ref) => {
    return <Box ref={ref} sx={{ paddingX: 5, paddingTop: 4 }} {...props} />;
  }
);
