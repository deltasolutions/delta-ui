import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { Button, ButtonProps } from './Button';

export interface AccountProps extends ButtonProps {}

export const Account = forwardRef<HTMLButtonElement, AccountProps>(
  ({ children, ...rest }, ref) => {
    return (
      <Button
        ref={ref}
        sx={{
          borderRadius: '1em',
          display: 'flex',
          gap: '0.5em',
          fontSize: 2,
          alignItems: 'center',
          '&:not(:disabled):hover, &:focus-visible': {
            color: 'accentOnBackground',
          },
        }}
        {...rest}
      >
        <FaUserAlt
          sx={{
            width: '1.15em',
            height: '1.15em',
            my: '-0.5em',
          }}
        />
        <span>{children}</span>
      </Button>
    );
  }
);
