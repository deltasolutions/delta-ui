import {
  DataOperatorProvider,
  NatsDataOperatorContext,
  NatsDataOperatorOptions
} from '../models';
import { makeDataOperator } from './makeDataOperator';

export const createNatsDataOperator = <
  Data,
  Provider extends DataOperatorProvider<Data, NatsDataOperatorContext>
>({
  connection,
  provider
}: NatsDataOperatorOptions<Data, Provider>) => {
  return makeDataOperator<Data, NatsDataOperatorContext, Provider>({
    provider,
    context: { connection }
  });
};
