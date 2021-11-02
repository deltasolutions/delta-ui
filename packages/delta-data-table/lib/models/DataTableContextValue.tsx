import { DataTableManager } from './DataTableManager';

export interface DataTableContextValue<T extends object> {
  manager: DataTableManager<T>;
}
