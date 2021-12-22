import { DataTableColumnOptions } from '../models';
import { getColumnWidth } from './getColumnWidth';

export const getRowWidth = (columns: DataTableColumnOptions<object>[]) => {
  return columns.reduce((p, v) => p + getColumnWidth(v), 0);
};
