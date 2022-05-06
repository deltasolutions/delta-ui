import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Button, ButtonProps } from '../Button';
export interface ConfirmButtonProps extends ButtonProps {}
export const ConfirmButton = forwardRef<HTMLButtonElement, ConfirmButtonProps>(
  ({ children, ...rest }: ConfirmButtonProps) => (
    <Button
      size="large"
      zoomable
      uppercase
      variant="contained"
      color="success"
      {...rest}
    >
      {children}
    </Button>
  )
);
