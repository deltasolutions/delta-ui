import { DataChestDispatcher } from './DataChestDispatcher';
import { DataChestState } from './DataChestState';
import { DataDispatcher } from './DataDispatcher';
import { DataSeeder } from './DataSeeder';

export type DataChest<
  Data,
  Dispatcher extends DataDispatcher<Data>,
  Seeder extends DataSeeder<Dispatcher>
> = DataChestState<Data> & DataChestDispatcher<Data, Dispatcher, Seeder>;

const dispatcher = {
  fetch: async (v: string) => ({ data: v }),
  create: async (v: string) => ({ data: v }),
  subscribe: async () => ({
    subscription: {
      cancel: () => {},
      [Symbol.asyncIterator]() {
        return {
          i: 0,
          async next() {
            return { value: 'noop', done: true };
          }
        };
      }
    }
  })
};

const seeder = {
  fetch: () => ''
};

const x = null as unknown as DataChest<
  string,
  typeof dispatcher,
  typeof seeder
>;

x.fetch('');

x.create('');

x.subscribe();

// x.fetch('1234');
// x.remove();

/*




const C = () => {
  const transport = useNatsDataTransport({
    // ...
  })
  const chest = useDataChest({
    transport
  })

  //...

  chest.setData({ ... })
  // chest.exec('create')
  chest.create({ ... })
}



*/
