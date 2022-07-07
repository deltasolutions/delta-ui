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
          fontFamily: 'inherit',
          fontWeight: 'inherit',
          whiteSpace: 'inherit',
          borderRadius: 2,
          textDecoration: 'none',
          '&:focus-visible': {
            outlineColor: 'primary',
          },
          '&:active, &:focus-visible, &:hover': {
            color: 'accentOnBackground',
          },
          ...(variant === 'pure'
            ? {}
            : {
                textDecoration: 'underline',
                textUnderlineOffset: '1px',
              }),
        }}
        {...rest}
      >
        {children}
      </a>
    );
  }
);
