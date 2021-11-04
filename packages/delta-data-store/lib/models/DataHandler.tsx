import { DataOperation } from './DataOperation';

export interface DataHandler<Data, Seed> {
  [operation: string]: DataOperation<Data, Seed>;
}
