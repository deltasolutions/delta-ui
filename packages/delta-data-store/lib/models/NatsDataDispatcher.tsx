import { NatsDataProvider } from './NatsDataProvider';

export type NatsDataDispatcher<Provider extends NatsDataProvider<any>> = {
  [K in keyof Provider]: Parameters<Provider[K]>[1] extends undefined
    ? () => ReturnType<Provider[K]>
    : (seed: Parameters<Provider[K]>[1]) => ReturnType<Provider[K]>;
};
