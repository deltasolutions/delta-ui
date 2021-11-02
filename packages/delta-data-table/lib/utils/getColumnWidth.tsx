import { DataTableColumnDef } from '../models';

export const getColumnWidth = (column: DataTableColumnDef) => {
  return column.width || 150;
};
