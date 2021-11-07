import {
  DataOperatorProvider,
  NatsDataOperatorContext,
  NatsDataOperatorOptions
} from '../models';
import { makeDataOperator } from './makeDataOperator';

export const createNatsDataOperator = <
  Provider extends DataOperatorProvider<any, NatsDataOperatorContext>
>({
  connection,
  provider
}: NatsDataOperatorOptions<Provider>) => {
  return makeDataOperator<Provider>({
    provider,
    context: { connection } as any
  });
};
