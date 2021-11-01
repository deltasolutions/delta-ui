import { Dispatch, SetStateAction } from 'react';
import { DataTableTabDef } from './DataTableTabDef';

export interface DataTableTabManager {
  activeTab: DataTableTabDef;
  activeTabName: string;
  setActiveTabName: Dispatch<SetStateAction<string>>;
  updateActiveTab: (
    dispatcher: SetStateAction<Partial<DataTableTabDef>>
  ) => void;
  addTab: (name: string) => void;
  removeTab: (name: string) => void;
}
