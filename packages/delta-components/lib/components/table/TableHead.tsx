import { jsx } from '@theme-ui/core';
import { forwardRef, HTMLAttributes, useEffect, useRef, useState } from 'react';
import { LAYOUT_HEADER_HEIGHT } from '../../variables';
import { Box } from '../Box';
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
