import {
  createTable,
  useTableInstance,
  getCoreRowModel,
} from '@tanstack/react-table';
import { jsx } from '@theme-ui/core';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Table,
  TableBody,
  TableBodyCell,
  TableHeader,
  TableHeaderCell,
  TableHeaderRow,
  TableRow,
} from '../../../displays';
import { Box } from '../../Box';
import { defaultData } from './fakeData';
import { SearchInput } from './SearchInput';

interface Person {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  ip_address: string;
}

let table = createTable().setRowType<Person>();

const defaultColumns = [
  table.createDataColumn('id', {}),
  table.createDataColumn('first_name', {}),
  table.createDataColumn('last_name', {}),
  table.createDataColumn('gender', {}),
  table.createDataColumn('email', {}),
  table.createDataColumn('ip_address', {}),
];
const parsedQuery = query => {
  const arr = query.split(' ').filter(i => !(+i === 0));
  const obj = {};
  arr.forEach(i => {
    const [key, value] = i.split(':');
    if (key && value) {
      obj[key] = value;
    }
  });
  return obj;
};
const dData = defaultData.slice(0, 40);
export const DeviceTable = ({ stickyOffset }) => {
  const [query, setQuery] = useState('');

  const [data, setData] = useState(() => [...dData]);
  const instance = useTableInstance(table, {
    defaultColumn: {
      minSize: 30,
      maxSize: 1000,
    },
    data,
    columns: defaultColumns,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
  });
  useEffect(() => {
    setData(
      dData.filter(datum =>
        Object.entries(parsedQuery(query) ?? {}).every(
          ([key, value]: [key: string, value: string]) => {
            if (!datum[key]) return true;
            let safeValue = datum[key];
            if (typeof datum[key] === 'number') {
              safeValue = safeValue.toString();
            }
            return safeValue
              .toLocaleLowerCase()
              .includes(value.toLocaleLowerCase());
          }
        )
      )
    );
  }, [query]);
  return (
    <Box sx={{ display: 'flex', gap: 3, flexDirection: 'column' }}>
      <SearchInput value={query} onChange={setQuery} />
      <Table
        {...{
          style: {
            width: instance.getCenterTotalSize(),
          },
        }}
      >
        <TableHeader stickyOffset={stickyOffset}>
          {instance.getHeaderGroups().map(headerGroup => (
            <TableHeaderRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <TableHeaderCell
                    {...{
                      key: header.id,
                      colSpan: header.colSpan,
                      style: {
                        width: header.getSize(),
                      },
                    }}
                  >
                    {header.isPlaceholder ? null : header.renderHeader()}
                    <Box
                      sx={{
                        position: 'absolute',
                        right: '0',
                        top: '0',
                        height: '100%',
                        width: '5px',
                        cursor: 'col-resize',
                        userSelect: 'none',
                        touchAction: 'none',
                        ...(header.column.getIsResizing()
                          ? {
                              backgroundColor: 'rgb(199, 199, 199)',
                              opacity: 1,
                            }
                          : {}),
                      }}
                      {...{
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                      }}
                    />
                  </TableHeaderCell>
                );
              })}
            </TableHeaderRow>
          ))}
        </TableHeader>
        <TableBody>
          {instance.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableBodyCell
                  {...{
                    key: cell.id,
                    style: {
                      width: cell.column.getSize(),
                    },
                  }}
                >
                  {cell.renderCell()}
                </TableBodyCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};
