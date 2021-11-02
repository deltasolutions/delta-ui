import { DataTableContentManagerOptions } from './DataTableContentManagerOptions';
import { DataTableLayoutManagerOptions } from './DataTableLayoutManagerOptions';

export interface DataTableManagerOptions<T extends object>
  extends DataTableLayoutManagerOptions,
    Omit<DataTableContentManagerOptions<T>, 'tabManager'> {}
