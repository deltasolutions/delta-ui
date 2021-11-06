import { DataOperation } from './DataOperation';

export interface DataOperator<Data> {
  [operation: string]: DataOperation<Data, any>;
}
