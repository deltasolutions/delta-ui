import { DataTableColumnDef } from './DataTableColumnDef';
import { DataTableTabManager } from './DataTableTabManager';

export interface DataTableContentManagerOptions<T extends object> {
  tabManager: DataTableTabManager;
  initialContent: {
    data: T[];
    columns: DataTableColumnDef[];
    hasNextChunk: boolean;
  };
  getNextChunk?: () => Promise<{ data: T[]; hasNextChunk: boolean }>;
}
