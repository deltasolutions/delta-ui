import { DataTableProps } from './DataTableProps';

export interface DataTableContextValue<T extends object>
  extends Pick<
    DataTableProps<T>,
    'manager' | 'rowHeight' | 'maxHeight' | 'toolbar' | 'getRowProps'
  > {}
