import { DataChestHandler } from './DataChestHandler';
import { DataChestState } from './DataChestState';
import { DataHandler } from './DataHandler';

export type DataChest<
  Data,
  Seed,
  Handler extends DataHandler<Data, Seed>
> = DataChestState<Data, Seed> & DataChestHandler<Data, Seed, Handler>;

const transport = {
  fetch: async (v: string) => ({ data: v }),
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
  }),
  create: async (v: string) => ({ data: v })
};

const x = null as unknown as DataChest<string, string, typeof transport>;

x.fetch();
x.create();
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
