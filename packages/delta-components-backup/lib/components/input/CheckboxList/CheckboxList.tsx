import { jsx } from '@theme-ui/core';
import {
  Children,
  cloneElement,
  forwardRef,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  SelectHTMLAttributes
} from 'react';
import { Box } from '../../Box';
export interface CheckboxListProps extends HTMLAttributes<HTMLDivElement> {}

export const CheckboxList = forwardRef<HTMLDivElement, CheckboxListProps>(
  ({ children, ...rest }: CheckboxListProps, ref) => {
    return (
      <Box
        sx={{
          overflow: 'scroll',
          flexDirection: 'column',
          display: 'flex',
          width: '100%'
        }}
        {...rest}
        ref={ref}
      >
        {Children.map(children, (child: ReactElement<any, any>, index) => {
          return cloneElement(child, {
            id: index,
            isLast: index === Children.count(children) - 1
          });
        })}
      </Box>
    );
  }
);
