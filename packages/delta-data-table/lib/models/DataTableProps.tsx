import { ReactElement, ReactNode } from 'react';
import { BoxProps } from 'restyler';
import { DataTableManager } from './DataTableManager';

export interface DataTableProps<T extends object> extends BoxProps {
  getRowProps?: (datum: T, index: number) => BoxProps;
  isHeightAdaptive?: boolean;
  toolbar?: {
    initialSection?: string;
    sections: (
      | 'tabs'
      | 'query'
      | 'configurer'
      | {
          id: string;
          toggler: ReactElement;
          content: ReactNode;
        }
    )[];
  };
  manager: DataTableManager<T>;
}
