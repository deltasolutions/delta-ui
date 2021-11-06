import { DataChestOperator } from './DataChestOperator';
import { DataChestState } from './DataChestState';
import { DataOperator } from './DataOperator';
import { DataSeeder } from './DataSeeder';

export type DataChest<
  Data,
  Operator extends DataOperator<Data>,
  Seeder extends DataSeeder<Operator>
> = DataChestState<Data> & DataChestOperator<Data, Operator, Seeder>;
