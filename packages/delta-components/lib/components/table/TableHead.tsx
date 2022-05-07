import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes } from 'react';

export interface TableHeadProps
  extends HTMLAttributes<HTMLTableSectionElement> {}

export const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  ({ ...rest }: TableHeadProps, ref) => {
    return (
      <thead
        ref={ref}
        sx={{
          borderBottomWidth: 1,
          borderBottomColor: 'outline',
          borderBottomStyle: 'solid'
        }}
        {...rest}
      />
    );
  }
);
