import { Dispatch, SetStateAction } from 'react';

export interface DataChestState<Data, Seed> {
  data: Data | undefined;
  seed: Seed | undefined;
  setData: Dispatch<SetStateAction<Data>>;
  setSeed: Dispatch<SetStateAction<Seed>>;
}
