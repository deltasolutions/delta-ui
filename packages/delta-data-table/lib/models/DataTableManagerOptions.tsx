import { DataTableContentManagerOptions } from './DataTableContentManagerOptions';
import { DataTableLayoutManagerOptions } from './DataTableLayoutManagerOptions';
import { DataTableTabManagerOptions } from './DataTableTabManagerOptions';

export interface DataTableManagerOptions<T extends object>
  extends DataTableLayoutManagerOptions,
    Omit<DataTableTabManagerOptions, 'layoutManager'>,
    Omit<DataTableContentManagerOptions<T>, 'tabManager' | 'queryManager'> {}
