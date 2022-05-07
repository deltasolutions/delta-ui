import { jsx } from '@theme-ui/core';
import { AnchorHTMLAttributes, FC, forwardRef } from 'react';
import { headingStyles } from './Heading';
export interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  underline?: 'none' | 'hover' | 'always';
  variant?: 'inherit';
}
export const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>(
  ({ children, variant, underline = 'hover', ...rest }: AnchorProps, ref) => {
    return (
      <a
        ref={ref}
        sx={{
          cursor: 'pointer',
          margin: 0,
          padding: 0,
          ...(variant
            ? {
                color: 'inherit',
                fontSize: 'inherit',
                fontWeight: 'inherit',
                whiteSpace: 'inherit',
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
                }[underline]
              }
            : {
                textDecoration: 'none',
                color: 'inherit',
                '&:hover, &:active, &:focus-visible': {
                  textDecoratione: 'none'
                }
              })
        }}
        {...rest}
      >
        {children}
      </a>
    );
  }
);
