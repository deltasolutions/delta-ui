import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes, useEffect } from 'react';
import {
  LAYOUT_HEADER_HEIGHT as height,
  LAYOUT_BODY_PADDING as padding
} from '../../variables';
import { Box } from '../Box';

export interface LayoutHeaderProps extends HTMLAttributes<HTMLDivElement> {}
export const LayoutHeader = forwardRef<HTMLDivElement, LayoutHeaderProps>(
  ({ ...rest }: LayoutHeaderProps, ref) => {
    return (
      <Box
        sx={{
          width: '100%',
          gridArea: 'header',
          position: 'sticky',
          height: `${height}px`,
          top: 0,
          zIndex: 2,
          '& > div': {
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingX: `${padding}px`
          }
        }}
        {...rest}
      />
    );
  }
);
