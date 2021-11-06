import { DataChestOperator } from './DataChestOperator';
import { DataChestState } from './DataChestState';
import { DataOperator } from './DataOperator';
import { DataSeeder } from './DataSeeder';

export type DataChest<
  Data,
  Operator extends DataOperator<Data>,
  Seeder extends DataSeeder<Operator>
> = DataChestState<Data> & DataChestOperator<Data, Operator, Seeder>;

// const operator = {
//   fetch: async (v: string) => ({ data: v }),
//   create: async (v: string) => ({ data: v }),
//   subscribe: async () => ({
//     subscription: {
//       cancel: () => {},
//       [Symbol.asyncIterator]() {
//         return {
//           i: 0,
//           async next() {
//             return { value: 'noop', done: true };
//           }
//         };
//       }
//     }
//   })
// };
// const seeder = {
//   fetch: () => ''
// };
// const x = null as unknown as DataChest<string, typeof operator, typeof seeder>;
// x.fetch('');
// x.create('');
