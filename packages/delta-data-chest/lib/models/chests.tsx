import { Dispatch, SetStateAction } from 'react';
import { DataOperator, OperatedData } from './operators';

export type DataChestSeeder<Operator extends DataOperator<any>> = {
  [K in keyof Operator]?: (
    data?: OperatedData<Operator>
  ) => Parameters<Operator[K]>[0];
};

export interface DataChestState<Data> {
  data: Data | undefined;
  setData: Dispatch<SetStateAction<Data>>;
}

export type DataChestOperator<
  Operator extends DataOperator<any>,
  Seeder extends DataChestSeeder<Operator>
> = {
  [K in keyof Operator]: Parameters<Operator[K]>[0] extends undefined
    ? () => ReturnType<Operator[K]>
    : Seeder[K] extends Function
    ? (seed?: Parameters<Operator[K]>[0]) => ReturnType<Operator[K]>
    : (seed: Parameters<Operator[K]>[0]) => ReturnType<Operator[K]>;
};

export type DataChest<
  Operator extends DataOperator<any>,
  Seeder extends DataChestSeeder<Operator>
> = DataChestState<OperatedData<Operator>> &
  DataChestOperator<Operator, Seeder>;

export interface DataChestOptions<
  Operator extends DataOperator<any>,
  Seeder extends DataChestSeeder<Operator>
> {
  operator?: Operator;
  seeder?: Seeder;
  isLive?: boolean;
}
