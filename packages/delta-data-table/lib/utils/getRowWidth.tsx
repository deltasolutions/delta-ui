import { DataTableColumnDef } from '../models';
import { getColumnWidth } from './getColumnWidth';

export const getRowWidth = (columns: DataTableColumnDef[]) => {
  return columns.reduce((p, v) => p + getColumnWidth(v), 0);
};
