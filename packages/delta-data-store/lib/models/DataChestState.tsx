import { Dispatch, SetStateAction } from 'react';

export interface DataChestState<Data> {
  data: Data | undefined;
  setData: Dispatch<SetStateAction<Data>>;
}
