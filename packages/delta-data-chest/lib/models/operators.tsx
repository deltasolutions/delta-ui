import { DataSubscription } from './subscriptions';

export interface DataOperationResult<Data> {
  data?: Data;
  subscription?: DataSubscription<Data>;
}

export interface DataOperation<Data, Seed = undefined> {
  (seed: Seed): Promise<DataOperationResult<Data> | void>;
}

export interface DataOperator<Data> {
  [operation: string]: DataOperation<Data, any>;
}

export interface DataOperatorProvider<Data, Context> {
  [operation: string]: (
    context: Context,
    seed: any
  ) => Promise<DataOperationResult<Data> | void>;
}

export type ProvidedDataOperator<
  Provider extends DataOperatorProvider<any, any>
> = {
  [K in keyof Provider]: Parameters<Provider[K]>[1] extends undefined
    ? () => ReturnType<Provider[K]>
    : (seed: Parameters<Provider[K]>[1]) => ReturnType<Provider[K]>;
};

export interface DataOperatorOptions<
  Data,
  Context,
  Provider extends DataOperatorProvider<Data, Context>
> {
  context: Context;
  provider: Provider;
}
