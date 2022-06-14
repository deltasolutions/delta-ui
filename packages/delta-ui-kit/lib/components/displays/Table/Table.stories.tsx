import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useEffect, useRef, useState } from 'react';
import { compact } from '../../../../docs/decorators';
import { Box, Card, CardBody, CardHeader, Heading } from '../../containers';
import { Table } from './Table';
import { TableBody } from './TableBody';
import { TableBodyCell } from './TableBodyCell';
import { TableBodyRow } from './TableBodyRow';
import { TableHeader } from './TableHeader';
import { TableHeaderCell } from './TableHeaderCell';
import { TableHeaderRow } from './TableHeaderRow';

export default {
  title: 'Displays/Table',
  decorators: [compact('1000px')],
} as Meta;

export const Basics = () => {
  return (
    <Card sx={{ height: '400px', overflowY: 'auto' }}>
      <CardHeader variant="table">
        <Heading level={3}>Devices</Heading>
      </CardHeader>
      <CardBody variant="table">
        <Table>
          <TableHeader stickyOffset={-1}>
            <TableHeaderRow>
              <TableHeaderCell>h1</TableHeaderCell>
              <TableHeaderCell>h2</TableHeaderCell>
              <TableHeaderCell>h3</TableHeaderCell>
            </TableHeaderRow>
          </TableHeader>
          <TableBody>
            <TableBodyRow>
              <TableBodyCell>1-1</TableBodyCell>
              <TableBodyCell>1-2</TableBodyCell>
              <TableBodyCell>1-3</TableBodyCell>
            </TableBodyRow>
            <TableBodyRow>
              <TableBodyCell>2-1</TableBodyCell>
              <TableBodyCell>2-2</TableBodyCell>
              <TableBodyCell>2-3</TableBodyCell>
            </TableBodyRow>
            <TableBodyRow>
              <TableBodyCell>3-1</TableBodyCell>
              <TableBodyCell>3-2</TableBodyCell>
              <TableBodyCell>3-3</TableBodyCell>
            </TableBodyRow>
            <TableBodyRow>
              <TableBodyCell>1-1</TableBodyCell>
              <TableBodyCell>1-2</TableBodyCell>
              <TableBodyCell>1-3</TableBodyCell>
            </TableBodyRow>
            <TableBodyRow>
              <TableBodyCell>2-1</TableBodyCell>
              <TableBodyCell>2-2</TableBodyCell>
              <TableBodyCell>2-3</TableBodyCell>
            </TableBodyRow>
            <TableBodyRow>
              <TableBodyCell>3-1</TableBodyCell>
              <TableBodyCell>3-2</TableBodyCell>
              <TableBodyCell>3-3</TableBodyCell>
            </TableBodyRow>
            <TableBodyRow>
              <TableBodyCell>1-1</TableBodyCell>
              <TableBodyCell>1-2</TableBodyCell>
              <TableBodyCell>1-3</TableBodyCell>
            </TableBodyRow>
            <TableBodyRow>
              <TableBodyCell>2-1</TableBodyCell>
              <TableBodyCell>2-2</TableBodyCell>
              <TableBodyCell>2-3</TableBodyCell>
            </TableBodyRow>
            <TableBodyRow>
              <TableBodyCell>3-1</TableBodyCell>
              <TableBodyCell>3-2</TableBodyCell>
              <TableBodyCell>3-3</TableBodyCell>
            </TableBodyRow>
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
};
