import { DataTableColumn } from './types';

export const getColumnWidth = (column: DataTableColumn) => {
  return column.width || 150;
};

export const getRowWidth = (columns: DataTableColumn[]) => {
  return columns.reduce((p, v) => p + getColumnWidth(v), 0);
};
