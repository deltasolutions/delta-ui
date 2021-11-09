import { BoxProps } from 'restyler';
import { DataTableManager } from './DataTableManager';

export interface DataTableProps<T extends object> extends BoxProps {
  getRowProps?: (datum: T, index: number) => BoxProps;
  isHeightAdaptive?: boolean;
  manager: DataTableManager<T>;
}
