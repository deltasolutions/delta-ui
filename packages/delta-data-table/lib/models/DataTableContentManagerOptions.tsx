import { DataTableColumnDef } from './DataTableColumnDef';
import { DataTableQueryManager } from './DataTableQueryManager';
import { DataTableTabManager } from './DataTableTabManager';

export interface DataTableContentManagerOptions<T extends object> {
  tabManager: DataTableTabManager;
  queryManager: DataTableQueryManager;
  initialContent: {
    data: T[];
    columns: DataTableColumnDef[];
    hasNextChunk: boolean;
  };
  getNextChunk?: (options: {
    offset: number;
    query?: string;
  }) => Promise<{ data: T[]; hasNextChunk: boolean }>;
}
