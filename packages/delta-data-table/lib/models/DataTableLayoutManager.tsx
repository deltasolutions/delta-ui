import { Dispatch, SetStateAction } from 'react';
import { DataTableLayoutDef } from './DataTableLayoutDef';
import { DataTableLayoutManagerOptions } from './DataTableLayoutManagerOptions';
import { DataTableLayoutStatus } from './DataTableLayoutStatus';

export interface DataTableLayoutManager extends DataTableLayoutManagerOptions {
  layout: DataTableLayoutDef;
  setLayout: React.Dispatch<React.SetStateAction<DataTableLayoutDef>>;
  isConfiguringLayout: boolean;
  setIsConfiguringLayout: Dispatch<SetStateAction<boolean>>;
  layoutStatus: DataTableLayoutStatus;
  setLayoutStatus: Dispatch<SetStateAction<DataTableLayoutStatus>>;
}
