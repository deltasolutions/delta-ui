import { Subscription } from './Subscription';

export type NatsDataHandler<Data, Seed, Operations> = {
  [K in keyof Operations]: Operations[K] extends string
    ? K extends 'fetch'
      ? (seed: Seed) => Promise<{ data: Data }>
      : K extends 'subscribe'
      ? (seed: Seed) => Promise<{ subscription: Subscription<Data> }>
      : (seed: Seed) => Promise<void>
    : Operations[K] extends string
    ? (seed: Seed) => Promise<void>
    : Operations[K];
};
