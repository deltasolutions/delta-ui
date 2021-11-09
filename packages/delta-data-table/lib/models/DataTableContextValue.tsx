import { DataTableManager } from './DataTableManager';
import { DataTableProps } from './DataTableProps';

export interface DataTableContextValue<T extends object> {
  getRowProps?: DataTableProps<T>['getRowProps'];
  isHeightAdaptive?: DataTableProps<T>['isHeightAdaptive'];
  manager: DataTableManager<T>;
}
