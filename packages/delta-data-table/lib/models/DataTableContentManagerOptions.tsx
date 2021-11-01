import { DataTableColumnDef } from './DataTableColumnDef';
import { DataTableTabManager } from './DataTableTabManager';

export interface DataTableContentManagerOptions<T extends object> {
  tabManager: DataTableTabManager;
  initialData: T[];
  initialColumns: DataTableColumnDef[];
  getNextChunk: () => T[] | Promise<T[]>;
}
