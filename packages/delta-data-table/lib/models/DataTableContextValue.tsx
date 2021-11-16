import { DataTableProps } from './DataTableProps';

export interface DataTableContextValue<T extends object>
  extends Pick<
    DataTableProps<T>,
    'getRowProps' | 'isHeightAdaptive' | 'toolbar' | 'manager'
  > {}
