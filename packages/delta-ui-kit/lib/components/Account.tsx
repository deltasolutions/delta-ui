import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { Button, ButtonProps } from './Button';
import { Box } from './containers';

export interface AccountProps extends ButtonProps {}

export const Account = forwardRef<HTMLButtonElement, AccountProps>(
  ({ children, ...rest }: AccountProps, ref) => {
    return (
      <Button
        ref={ref}
        sx={{
          borderRadius: '100%',
          display: 'flex',
          gap: 2,

          fontSize: 2,
          alignItems: 'center',
        }}
        {...rest}
      >
        <FaUserAlt
          sx={{
            width: '0.78rem',
            height: '0.78rem',
          }}
        />
        <span>{children}</span>
      </Button>
    );
  }
);
