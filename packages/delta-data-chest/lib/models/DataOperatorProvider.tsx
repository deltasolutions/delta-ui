import { DataOperationResult } from './DataOperation';

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

// export type ProvidedDataOperatorContext<
//   Provider extends DataOperatorProvider<any, any>
// > = Provider extends DataOperatorProvider<any, infer Context>
//   ? Context
//   : unknown;
