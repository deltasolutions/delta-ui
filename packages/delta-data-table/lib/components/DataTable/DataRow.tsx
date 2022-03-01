import { jsx } from '@theme-ui/core';
import { useContext } from 'react';
import { BoxProps, useThemed } from 'restyler';
import { getColumnWidth } from '../../utils';
import { DataTableContext } from './DataTableContext';

export interface DataRowProps extends BoxProps {
  index: number;
}

export const DataRow = ({ index, style, ...rest }: DataRowProps) => {
  const Row = useThemed('div', 'dataTable.row');
  const Cell = useThemed('div', 'dataTable.cell');
  const {
    getRowProps,
    manager: { data, coercedColumns }
  } = useContext(DataTableContext);
  const datum = data[index] ?? {};
  const { style: styleOverrides, ...restOverrides } =
    getRowProps?.(datum, index) ?? {};
  return (
    <Row style={{ ...style, ...styleOverrides }} {...rest} {...restOverrides}>
      {coercedColumns.map(v => {
        return (
          <Cell
            key={v.key}
            style={{
              display: 'inline-block',
              width: getColumnWidth(v) + 'px'
            }}
          >
            {v.render ? v.render(datum, index) : datum[v.key]}
          </Cell>
        );
      })}
    </Row>
  );
};
