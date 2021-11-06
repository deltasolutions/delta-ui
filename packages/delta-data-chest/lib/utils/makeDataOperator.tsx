import {
  DataOperatorOptions,
  DataOperatorProvider,
  ProvidedDataOperator
} from '../models';

export const makeDataOperator = <
  Data,
  Context,
  Provider extends DataOperatorProvider<Data, any>
>({
  context,
  provider
}: DataOperatorOptions<
  Data,
  Context,
  Provider
>): ProvidedDataOperator<Provider> => {
  const makeOperation = (fn: Provider[string]) => (seed: any) =>
    fn(context, seed);
  return Object.entries(provider).reduce(
    (p, [k, v]) => ({
      ...p,
      [k]: makeOperation(v as any)
    }),
    {} as ProvidedDataOperator<Provider>
  );
};
