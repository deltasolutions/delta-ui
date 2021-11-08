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
  connection,
  provider
}: NatsDataOperatorOptions<Provider>) => {
  return makeDataOperator<Provider>({
    provider,
    context: { connection } as ProvidedDataOperatorContext<Provider>
  });
};
