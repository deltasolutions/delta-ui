import { Dispatch, SetStateAction } from 'react';
import { DataTableLayoutDef } from './DataTableLayoutDef';
import { DataTableLayoutManagerOptions } from './DataTableLayoutManagerOptions';
import { DataTableTabDef } from './DataTableTabDef';

export interface DataTableLayoutManager extends DataTableLayoutManagerOptions {
  layout: DataTableLayoutDef;
  setLayout: React.Dispatch<React.SetStateAction<DataTableLayoutDef>>;
  isConfiguringLayout: boolean;
  setIsConfiguringLayout: Dispatch<SetStateAction<boolean>>;

  // Make this property required.
  initialTab: DataTableTabDef;
}
