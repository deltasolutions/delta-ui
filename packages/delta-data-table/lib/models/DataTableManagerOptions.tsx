import { DataTableContentManagerOptions } from './DataTableContentManagerOptions';

export interface DataTableManagerOptions<T extends object>
  extends Omit<DataTableContentManagerOptions<T>, 'tabManager'> {}
