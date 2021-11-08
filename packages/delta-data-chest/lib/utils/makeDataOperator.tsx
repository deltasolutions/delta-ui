import {
  DataOperatorOptions,
  DataOperatorProvider,
  ProvidedDataOperator
} from '../models';

export const makeDataOperator = <Provider extends DataOperatorProvider<any>>({
  context,
  provider
}: DataOperatorOptions<Provider>): ProvidedDataOperator<Provider> => {
  const makeOperation = (fn: Provider[string]) => (seed: any) =>
    fn(context)(seed);
  return Object.entries(provider).reduce(
    (p, [k, v]) => ({
      ...p,
      [k]: makeOperation(v as any)
    }),
    {} as ProvidedDataOperator<Provider>
  );
};
