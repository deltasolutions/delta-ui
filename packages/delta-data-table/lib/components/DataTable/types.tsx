import { HTMLAttributes, ReactNode } from 'react';
import { BoxProps } from 'restyler';

export interface DataTableColumn {
  key: string;
  header?: ReactNode;
  width?: number;
}

export interface DataTableProps<T extends object = { [key: string]: any }>
  extends BoxProps {
  getRowProps?: (datum: T, index: number) => HTMLAttributes<HTMLDivElement>;
  onDownload?: () => void;
  height?: number;
  columns: DataTableColumn[];
  data: T[];
}

export interface DataTableTab {
  name?: string;
  columnOrder?: string[];
  columnSizes?: { [accessor: string]: number };
  columnExclusions?: string[];
}

export interface DataTableLayout {
  tabs: DataTableTab[];
}

export enum DataTableLayoutStatus {
  Synced = 'synced',
  Syncing = 'syncing',
  SyncFailed = 'syncFailed'
}
