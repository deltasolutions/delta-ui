import { Dispatch, SetStateAction } from 'react';
import { DataTableChunkOptions } from './DataTableChunkOptions';
import { DataTableColumnDef } from './DataTableColumnDef';
import { DataTableContentManagerOptions } from './DataTableContentManagerOptions';

export interface DataTableContentManager<T extends object>
  extends Omit<
    DataTableContentManagerOptions<T>,
    'tabManager' | 'queryManager'
  > {
  coercedColumns: DataTableColumnDef[];
  columns: DataTableColumnDef[];
  data: T[];
  hasNextChunk: boolean;
  isLoadingNextChunk: boolean;
  requestNextChunk: (options: DataTableChunkOptions) => Promise<void>;
  setColumns: Dispatch<SetStateAction<DataTableColumnDef[]>>;
  setData: Dispatch<SetStateAction<T[]>>;
  setHasNextChunk: Dispatch<SetStateAction<boolean>>;
  setIsLoadingNextChunk: Dispatch<SetStateAction<boolean>>;
}
