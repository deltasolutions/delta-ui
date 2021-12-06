export type DataChestInitializer<Data> = Data | (() => Data);

export type DataChestUpdate<Data> = Data | ((prior: Data) => Data);

export interface DataChest<Data> {
  get: () => Data;
  set: (update: DataChestUpdate<Data>) => void;
  use: () => Data;
}
