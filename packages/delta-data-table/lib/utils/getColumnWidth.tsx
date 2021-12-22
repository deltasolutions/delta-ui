import { DataTableColumnOptions } from '../models';

export const getColumnWidth = (column: DataTableColumnOptions<object>) => {
  return column.width || 150;
};
