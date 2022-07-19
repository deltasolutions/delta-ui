import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { Anchor, AnchorProps } from './Anchor';

export interface AccountProps extends AnchorProps {}

export const Account = forwardRef<HTMLAnchorElement, AccountProps>(
  ({ children, ...rest }, ref) => {
    return (
      <Anchor
        ref={ref}
        sx={{
          borderRadius: '1em',
          display: 'flex',
          gap: '0.5em',
          fontSize: 2,
          alignItems: 'center',
        }}
        variant="pure"
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
      </Anchor>
    );
  }
);
