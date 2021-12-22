import { Dispatch, SetStateAction } from 'react';
import { DataTableChunkOptions } from './DataTableChunkOptions';
import { DataTableColumnOptions } from './DataTableColumnOptions';
import { DataTableContentManagerOptions } from './DataTableContentManagerOptions';

export interface DataTableContentManager<T extends object>
  extends Omit<
    DataTableContentManagerOptions<T>,
    'tabManager' | 'queryManager'
  > {
  coercedColumns: DataTableColumnOptions<T>[];
  columns: DataTableColumnOptions<T>[];
  data: T[];
  hasNextChunk: boolean;
  isLoadingNextChunk: boolean;
  requestNextChunk: (options: DataTableChunkOptions) => Promise<void>;
  setColumns: Dispatch<SetStateAction<DataTableColumnOptions<T>[]>>;
  setData: Dispatch<SetStateAction<T[]>>;
  setHasNextChunk: Dispatch<SetStateAction<boolean>>;
  setIsLoadingNextChunk: Dispatch<SetStateAction<boolean>>;
}
