import { DataSubscription } from './DataSubscription';

export interface DataOperationResult<Data> {
  data?: Data;
  subscription?: DataSubscription<Data>;
}

export interface DataOperation<Data, Seed = undefined> {
  (seed: Seed): Promise<DataOperationResult<Data> | void>;
}
