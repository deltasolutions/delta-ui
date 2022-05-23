import { jsx } from '@theme-ui/core';
import { forwardRef, HtmlHTMLAttributes } from 'react';
export interface ListProps extends HtmlHTMLAttributes<HTMLUListElement> {}

export const List = forwardRef<HTMLUListElement, ListProps>(
  (props: ListProps, ref) => {
    return (
      <ul
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
