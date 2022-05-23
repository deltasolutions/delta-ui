import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { Button, ButtonProps } from '../Button';
export interface ConfirmCancelButtonProps extends ButtonProps {}
export const ConfirmCancelButton = forwardRef<
  HTMLButtonElement,
  ConfirmCancelButtonProps
>(({ children, ...rest }: ConfirmCancelButtonProps) => (
  <Button
    size="medium"
    zoomable
    uppercase
    variant="text"
    sx={{ color: 'tertiary' }}
    color="secondary"
    {...rest}
  >
    {children}
  </Button>
));
