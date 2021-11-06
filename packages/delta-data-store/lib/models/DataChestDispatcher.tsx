import { DataDispatcher } from './DataDispatcher';
import { DataSeeder } from './DataSeeder';

export type DataChestDispatcher<
  Data,
  Dispatcher extends DataDispatcher<Data>,
  Seeder extends DataSeeder<Dispatcher>
> = {
  [K in keyof Dispatcher]: Parameters<Dispatcher[K]>[0] extends undefined
    ? () => ReturnType<Dispatcher[K]>
    : Seeder[K] extends Function
    ? (seed?: Parameters<Dispatcher[K]>[0]) => ReturnType<Dispatcher[K]>
    : (seed: Parameters<Dispatcher[K]>[0]) => ReturnType<Dispatcher[K]>;
};
