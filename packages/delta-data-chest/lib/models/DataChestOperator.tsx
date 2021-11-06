import { DataOperator } from './DataOperator';
import { DataSeeder } from './DataSeeder';

export type DataChestOperator<
  Data,
  Operator extends DataOperator<Data>,
  Seeder extends DataSeeder<Operator>
> = {
  [K in keyof Operator]: Parameters<Operator[K]>[0] extends undefined
    ? () => ReturnType<Operator[K]>
    : Seeder[K] extends Function
    ? (seed?: Parameters<Operator[K]>[0]) => ReturnType<Operator[K]>
    : (seed: Parameters<Operator[K]>[0]) => ReturnType<Operator[K]>;
};
