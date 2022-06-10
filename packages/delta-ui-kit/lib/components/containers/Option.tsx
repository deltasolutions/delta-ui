import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Button, ButtonProps } from '../Button';
import { Box } from './Box';

export const Option = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return (
      <Button
        ref={ref}
        sx={{
          paddingX: 1,
          paddingY: 1,
          textAlign: 'left',
          display: 'flex',
          justifyContent: 'space-between',
          borderRadius: '2px',
          gap: 2,
          fontSize: 2,
          '&:focus, &:active, &:focus-visible': {
            backgroundColor: 'monkaS',
            color: 'onPrimary',
          },
        }}
        {...props}
      />
    );
  }
);
