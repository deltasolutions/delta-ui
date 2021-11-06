import { DataOperator } from './DataOperator';

export type DataSeeder<Operator extends DataOperator<any>> = {
  [K in keyof Operator]?: (
    data?: Operator extends DataOperator<infer Data> ? Data : unknown
  ) => Parameters<Operator[K]>[0];
};
