import { jsx } from '@theme-ui/core';
import { forwardRef, HtmlHTMLAttributes } from 'react';
export interface ListItemProps extends HtmlHTMLAttributes<HTMLLIElement> {}

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  (props: ListItemProps, ref) => {
    return (
      <li
        ref={ref}
        sx={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          boxSizing: 'border-box',
          minWidth: 0
        }}
        {...props}
      />
    );
  }
);
