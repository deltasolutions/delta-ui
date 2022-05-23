import { jsx } from '@theme-ui/core';
import { AnchorHTMLAttributes, forwardRef } from 'react';

export interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'inherit';
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
          '&, &:hover, &:active, &:focus-visible': {
            color: 'inherit',
            fontSize: 'inherit',
            fontWeight: 'inherit',
            whiteSpace: 'inherit'
          },
          ...(variant
            ? { textDecoration: 'underline' }
            : { textDecoration: 'none' })
        }}
        {...rest}
      >
        {children}
      </a>
    );
  }
);
