import { Dispatch, SetStateAction } from 'react';
import { DataOperator } from './operators';

export type DataChestSeeder<Operator extends DataOperator<any>> = {
  [K in keyof Operator]?: (
    data?: Operator extends DataOperator<infer Data> ? Data : unknown
  ) => Parameters<Operator[K]>[0];
};

export interface DataChestState<Data> {
  data: Data | undefined;
  setData: Dispatch<SetStateAction<Data>>;
}

export type DataChestOperator<
  Data,
  Operator extends DataOperator<Data>,
  Seeder extends DataChestSeeder<Operator>
> = {
  [K in keyof Operator]: Parameters<Operator[K]>[0] extends undefined
    ? () => ReturnType<Operator[K]>
    : Seeder[K] extends Function
    ? (seed?: Parameters<Operator[K]>[0]) => ReturnType<Operator[K]>
    : (seed: Parameters<Operator[K]>[0]) => ReturnType<Operator[K]>;
};

export type DataChest<
  Data,
  Operator extends DataOperator<Data>,
  Seeder extends DataChestSeeder<Operator>
> = DataChestState<Data> & DataChestOperator<Data, Operator, Seeder>;
