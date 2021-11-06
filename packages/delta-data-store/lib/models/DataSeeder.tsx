import { DataDispatcher } from './DataDispatcher';

export type DataSeeder<Dispatcher extends DataDispatcher<any>> = {
  [K in keyof Dispatcher]?: (
    context: Dispatcher extends DataDispatcher<infer D> ? D : any
  ) => Parameters<Dispatcher[K]>[0];
};
