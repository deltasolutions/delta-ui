import { Dispatch, SetStateAction } from 'react';
import { DataTableColumnDef } from './DataTableColumnDef';
import { DataTableContentManagerOptions } from './DataTableContentManagerOptions';

export interface DataTableContentManager<T extends object>
  extends Omit<DataTableContentManagerOptions<T>, 'tabManager'> {
  coercedColumns: DataTableColumnDef[];
  columns: DataTableColumnDef[];
  data: T[];
  setColumns: Dispatch<SetStateAction<DataTableColumnDef[]>>;
  setData: Dispatch<SetStateAction<T[]>>;
  // Future:
  //   - sorts
  //   - query
  //   ...
}
