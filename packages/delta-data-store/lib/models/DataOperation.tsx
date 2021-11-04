import { Subscription } from './Subscription';

export interface DataOperation<Data, Seed> {
  (seed: Seed): Promise<{
    data?: Data;
    seed?: Seed;
    subscription?: Subscription<Data>;
  } | void>;
}
