import { DataTableManager } from './DataTableManager';
import { DataTableProps } from './DataTableProps';

export interface DataTableContextValue<T extends object> {
  manager: DataTableManager<T>;
  getRowProps?: DataTableProps<T>['getRowProps'];
}
