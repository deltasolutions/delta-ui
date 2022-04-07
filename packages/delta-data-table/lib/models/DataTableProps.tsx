import { ReactElement, ReactNode } from 'react';
import { BoxProps } from 'restyler';
import { DataTableManager } from './DataTableManager';

export interface DataTableProps<T extends object> extends BoxProps {
  getRowProps?: (datum: T, index: number) => BoxProps;
  rowHeight?: number;
  maxHeight?: number;
  overscanCount?: number;
  toolbar?: {
    sections: {
      id: string;
      toggler?: ReactElement;
      content?: ReactNode;
    }[];
  };
  manager: DataTableManager<T>;
}
