import { jsx } from '@theme-ui/core';
import { AnchorHTMLAttributes, FC, forwardRef } from 'react';
import { headingStyles } from './Heading';
export interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  underline?: 'none' | 'hover' | 'always';
  variant?: 'body' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
export const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>(
  (
    { children, variant = 'body', underline = 'hover', ...rest }: AnchorProps,
    ref
  ) => {
    return (
      <a
        ref={ref}
        sx={{
          cursor: 'pointer',
          ...{
            none: {
              textDecoration: 'none'
            },
            hover: {
              textDecoration: 'none',
              '&:hover, &:active, &:focus-visible': {
                textDecoration: 'underline'
              }
            },
            always: {
              textDecoration: 'underline'
            }
          }[underline],
          ...(headingStyles[variant] || headingStyles[variant]),
          padding: 0,
          margin: 0
        }}
        {...rest}
      >
        {children}
      </a>
    );
  }
);
