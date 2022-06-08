import { jsx } from '@theme-ui/core';
import { AnchorHTMLAttributes, forwardRef } from 'react';

export interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'pure';
}

export const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>(
  ({ children, variant, ...rest }: AnchorProps, ref) => {
    return (
      <a
        ref={ref}
        sx={{
          margin: 0,
          padding: 0,
          cursor: 'pointer',
          color: 'inherit',
          fontSize: 'inherit',
          fontWeight: 'inherit',
          whiteSpace: 'inherit',
          // Do we need these?
          // '&:hover, &:active, &:focus-visible': {
          //   color: 'unset',
          //   fontSize: 'unset',
          //   fontWeight: 'unset',
          //   whiteSpace: 'unset',
          // },
          textDecoration: variant === 'pure' ? 'none' : 'underline',
        }}
        {...rest}
      >
        {children}
      </a>
    );
  }
);
