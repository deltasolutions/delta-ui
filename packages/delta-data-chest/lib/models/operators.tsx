import { DataSubscription } from './subscriptions';

export interface DataOperationSyncResult<Data> {
  data?: Data;
  dataPatch?: Partial<Data>;
  meta?: any;
}

export interface DataOperationAsyncResult<Data> {
  subscription?: DataSubscription<DataOperationSyncResult<Data>>;
}

export type DataOperationResult<Data> = DataOperationSyncResult<Data> &
  DataOperationAsyncResult<Data>;

export interface DataOperation<Data> {
  (seed: any): Promise<DataOperationResult<Data> | void>;
}

export interface DataOperator<Data> {
  [operation: string]: DataOperation<Data>;
}

export type OperatedData<Operator> = Operator extends DataOperator<infer Data>
  ? Data
  : never;
