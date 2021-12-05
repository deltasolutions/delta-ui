import { Dispatch, SetStateAction } from 'react';
import { DataOperator, OperatedData } from './operators';

export interface DataChestState<Data> {
  data: Data | undefined;
  setData: Dispatch<SetStateAction<Data>>;
}

export type DataChest<Operator extends DataOperator<any>> = Operator &
  DataChestState<OperatedData<Operator>>;

export interface DataChestOptions<Operator extends DataOperator<any>> {
  initialData?: OperatedData<Operator> | (() => OperatedData<Operator>);
  operator?: Operator;
}
