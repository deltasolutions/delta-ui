import { jsx } from '@theme-ui/core';
import { useContext } from 'react';
import { BoxProps, useThemed } from 'restyler';
import { getColumnWidth } from '../../utils';
import { DataTableContext } from './DataTableContext';

export interface DataRowProps extends BoxProps {
  index: number;
}

export const DataRow = ({ index, style, ...rest }: DataRowProps) => {
  const TableRow = useThemed('div', 'dataTable.row');
  const TableCell = useThemed('div', 'dataTable.cell');
  const {
    getRowProps,
    manager: { data, coercedColumns }
  } = useContext(DataTableContext);
  const datum = data[index] ?? {};
  const { style: styleOverrides, ...restOverrides } =
    getRowProps?.(datum, index) ?? {};
  return (
    <TableRow
      style={{ ...style, ...styleOverrides }}
      {...rest}
      {...restOverrides}
    >
      {coercedColumns.map(v => {
        return (
          <TableCell
            key={v.key}
            style={{
              display: 'inline-block',
              width: getColumnWidth(v) + 'px'
            }}
          >
            {datum[v.key]}
          </TableCell>
        );
      })}
    </TableRow>
  );
};
