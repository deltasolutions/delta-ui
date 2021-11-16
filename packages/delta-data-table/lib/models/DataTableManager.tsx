import { DataTableContentManager } from './DataTableContentManager';
import { DataTableLayoutManager } from './DataTableLayoutManager';
import { DataTableQueryManager } from './DataTableQueryManager';
import { DataTableTabManager } from './DataTableTabManager';

export interface DataTableManager<T extends object>
  extends DataTableTabManager,
    DataTableLayoutManager,
    DataTableQueryManager,
    DataTableContentManager<T> {}
