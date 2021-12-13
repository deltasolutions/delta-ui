import { Dispatch, SetStateAction } from 'react';
import { DataTableTabDef } from './DataTableTabDef';
import { DataTableTabManagerOptions } from './DataTableTabManagerOptions';

export interface DataTableTabManager
  extends Omit<DataTableTabManagerOptions, 'layoutManager'> {
  activeTab: DataTableTabDef;
  activeTabName: string;
  setActiveTabName: Dispatch<SetStateAction<string>>;
  updateActiveTab: (
    dispatcher: SetStateAction<Partial<DataTableTabDef>>
  ) => void;
  addTab: (name: string) => void;
  removeTab: (name: string) => void;
}
