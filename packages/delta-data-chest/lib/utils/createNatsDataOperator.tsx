import {
  NatsDataOperator,
  NatsDataOperatorOptions,
  NatsDataProvider
} from '../models';

export const createNatsDataOperator = <
  Data,
  Provider extends NatsDataProvider<Data>
>({
  connection,
  provider
}: NatsDataOperatorOptions<Data>): NatsDataOperator<Provider> => {
  const createDataOperation = (fn: Provider[string]) => (seed: any) =>
    fn({ connection }, seed);
  return Object.entries(provider).reduce(
    (p, [k, v]) => ({
      ...p,
      [k]: createDataOperation(v as any)
    }),
    {} as NatsDataOperator<Provider>
  );
};
