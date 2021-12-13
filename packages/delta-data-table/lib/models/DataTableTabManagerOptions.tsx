import { DataTableLayoutManager } from './DataTableLayoutManager';
import { DataTableTabDef } from './DataTableTabDef';

export interface DataTableTabManagerOptions {
  layoutManager: DataTableLayoutManager;
  defaultTab?: Omit<DataTableTabDef, 'name'>;
}
