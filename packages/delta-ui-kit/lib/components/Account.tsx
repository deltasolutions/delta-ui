import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { IoPersonCircle } from 'react-icons/io5';
import { Button, ButtonProps } from './Button';
import { Box } from './containers';

export interface AccountProps extends ButtonProps {}

export const Account = forwardRef<HTMLButtonElement, AccountProps>(
  ({ children, ...rest }: AccountProps, ref) => {
    return (
      <Button ref={ref} {...rest}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <IoPersonCircle
            sx={{
              pr: 1,
              width: '1.45rem',
              height: '1.45rem',
            }}
          />
          <Box
            sx={{
              fontSize: 2,
              fontWeight: 300,
              letterSpacing: '0.04em',
            }}
          >
            {children}
          </Box>
        </Box>
      </Button>
    );
  }
);
