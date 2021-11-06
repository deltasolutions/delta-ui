import { Dispatch, SetStateAction } from 'react';
import { DataOperator } from './operators';

export type DataChestSeeder<Data, Operator extends DataOperator<any>> = {
  [K in keyof Operator]?: (data?: Data) => Parameters<Operator[K]>[0];
};

export interface DataChestState<Data> {
  data: Data | undefined;
  setData: Dispatch<SetStateAction<Data>>;
}

export type DataChestOperator<
  Data,
  Operator extends DataOperator<Data>,
  Seeder extends DataChestSeeder<Data, Operator>
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
  Seeder extends DataChestSeeder<Data, Operator>
> = DataChestState<Data> & DataChestOperator<Data, Operator, Seeder>;

export interface DataChestOptions<
  Data,
  Operator extends DataOperator<Data>,
  Seeder extends DataChestSeeder<Data, Operator>
> {
  operator?: Operator;
  seeder?: Seeder;
  isLive?: boolean;
}
