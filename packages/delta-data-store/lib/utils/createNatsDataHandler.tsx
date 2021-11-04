import { NatsDataHandlerOptions } from '../models';

export const createNatsDataHandler = <D, S>({
  operations,
  pack,
  unpack
}: NatsDataHandlerOptions<D, S>) => {};
