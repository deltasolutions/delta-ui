import { DataSubscription } from './subscriptions';

export interface DataOperationResult<Data> {
  meta?: any;
  data?: Data;
  subscription?: DataSubscription<Data>;
}

export interface DataOperation<Data, Seed = undefined> {
  (seed: Seed): Promise<DataOperationResult<Data> | void>;
}

export interface DataOperator<Data> {
  [operation: string]: DataOperation<Data, any>;
}

export type OperatedData<Operator> = Operator extends DataOperator<infer Data>
  ? Data
  : never;

export interface DataOperatorProvider<Context> {
  [operation: string]: (context: Context) => DataOperation<any, any>;
}

export type ProvidedDataOperatorContext<Provider> =
  Provider extends DataOperatorProvider<infer Context> ? Context : never;

export type ProvidedDataOperator<Provider extends DataOperatorProvider<any>> = {
  [K in keyof Provider]: ReturnType<Provider[K]>;
};

export interface DataOperatorOptions<
  Provider extends DataOperatorProvider<any>
> {
  context: ProvidedDataOperatorContext<Provider>;
  provider: Provider;
}
