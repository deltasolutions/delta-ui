import { DataOperator } from './DataOperator';

export type DataSeeder<Operator extends DataOperator<any>> = {
  [K in keyof Operator]?: (
    context: Operator extends DataOperator<infer D> ? D : any
  ) => Parameters<Operator[K]>[0];
};
