import { DataTableChunkOptions } from './DataTableChunkOptions';
import { DataTableColumnOptions } from './DataTableColumnOptions';
import { DataTableQueryManager } from './DataTableQueryManager';
import { DataTableTabManager } from './DataTableTabManager';

export interface DataTableContentManagerOptions<T extends object> {
  tabManager: DataTableTabManager;
  queryManager: DataTableQueryManager;
  initialContent: {
    data: T[];
    columns: DataTableColumnOptions<T>[];
    hasNextChunk: boolean;
  };
  getNextChunk?: (
    options: DataTableChunkOptions
  ) => Promise<{ data: T[]; hasNextChunk: boolean }>;
}
