import { DataTableLayoutManager } from './DataTableLayoutManager';
import { DataTableTabManager } from './DataTableTabManager';
import { DataTableContentManager } from '.';

export interface DataTableManager<T extends object>
  extends DataTableTabManager,
    DataTableLayoutManager,
    DataTableContentManager<T> {}
