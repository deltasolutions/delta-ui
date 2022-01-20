export type ChestInitializer<Data> = Data | (() => Data);

export type ChestUpdate<Data> = Data | ((prior: Data) => Data);

export interface Chest<Data> {
  get: () => Data;
  set: (update: ChestUpdate<Data>) => void;
  use: () => Data;
}
