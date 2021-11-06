import { DataOperation } from './DataOperation';

export interface DataDispatcher<Data> {
  [operation: string]: DataOperation<Data, any>;
}
