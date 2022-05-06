import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TableHeadRow
} from '../../lib';

export default {
  title: 'Data display/Table',
  component: Table
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = args => (
  <Table role="table" sx={{ width: '1000px' }} {...args}>
    <TableHead>
      <TableHeadRow>
        <TableHeadCell>Name</TableHeadCell>
        <TableHeadCell>Surname</TableHeadCell>
        <TableHeadCell>Data</TableHeadCell>
      </TableHeadRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>Alexander</TableCell>
        <TableCell>Emelyanov</TableCell>
        <TableCell>21.21.2120</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>JDijds</TableCell>
        <TableCell>Emely dsads</TableCell>
        <TableCell>21.21.2120</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>DIjsjda </TableCell>
        <TableCell>OJDois jda</TableCell>
        <TableCell>21.21.1111</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>DIjsjda </TableCell>
        <TableCell>OJDois jda</TableCell>
        <TableCell>21.21.1111</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

export const Basic = Template.bind({});

Basic.args = {};
const data = [];
