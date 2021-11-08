import {
  DataOperatorProvider,
  NatsDataOperatorContext,
  NatsDataOperatorOptions,
  ProvidedDataOperatorContext
} from '../models';
import { makeDataOperator } from './makeDataOperator';

export const makeNatsDataOperator = <
  Provider extends DataOperatorProvider<NatsDataOperatorContext>
>({
  getConnection,
  provider
}: NatsDataOperatorOptions<Provider>) => {
  return makeDataOperator<Provider>({
    provider,
    context: { getConnection } as ProvidedDataOperatorContext<Provider>
  });
};
