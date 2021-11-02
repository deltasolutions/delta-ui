import { DataTableManagerOptions } from './DataTableManagerOptions';

export interface StoredDataTableManagerOptions<T extends object>
  extends DataTableManagerOptions<T> {
  id: string;
}
