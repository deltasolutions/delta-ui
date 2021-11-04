import { DataHandler } from './DataHandler';

export type DataChestHandler<
  Data,
  Seed,
  Handler extends DataHandler<Data, Seed>
> = {
  [Operation in keyof Handler]: (seed?: Seed) => ReturnType<Handler[Operation]>;
};
