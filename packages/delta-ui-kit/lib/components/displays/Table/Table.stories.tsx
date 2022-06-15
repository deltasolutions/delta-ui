import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import {
  FiChevronDown,
  FiDownload,
  FiSearch,
  FiSettings,
} from 'react-icons/fi';
import { HiSearch } from 'react-icons/hi';
import { compact } from '../../../../docs/decorators';
import { Button } from '../../Button';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  TableCard,
  TableCardBody,
  TableCardHeader,
} from '../../containers';
import { TextInput } from '../../inputs';
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
    <Box sx={{ my: '100px' }}>
      <TableCard>
        <TableCardHeader>
          <Heading level={3}>Devices</Heading>
          <TableControls />
        </TableCardHeader>
        <TableCardBody>
          <Table>
            <TableHeader stickyOffset={-0.01}>
              <TableHeaderRow>
                <TableHeaderCell>
                  <span>Id</span>
                </TableHeaderCell>
                <TableHeaderCell>
                  <span>Имя</span>
                </TableHeaderCell>
                <TableHeaderCell>
                  <span>lorem</span>
                  <Button sx={{ borderRadius: '100%' }}>
                    <FiChevronDown />
                  </Button>
                </TableHeaderCell>
              </TableHeaderRow>
            </TableHeader>
            <TableBody>
              {new Array(30).fill(undefined).map((_, index) => (
                <TableBodyRow key={index}>
                  <TableBodyCell>
                    <span
                      sx={{
                        display: 'block',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Velit ullam reprehenderit consequuntur, commodi non
                      perferendis odit, quas voluptas aspernatur labore suscipit
                      iure? Optio veritatis dignissimos fuga eum. Mollitia, quos
                      quae!
                    </span>
                  </TableBodyCell>
                  <TableBodyCell>3</TableBodyCell>
                  <TableBodyCell>1-3</TableBodyCell>
                </TableBodyRow>
              ))}
            </TableBody>
          </Table>
        </TableCardBody>
      </TableCard>
    </Box>
  );
};
const TableControls = () => {
  return (
    <Box
      sx={{
        color: '#b7b7b6',
        alignItems: 'flex-start',
        gap: 1,
        display: 'flex',
      }}
    >
      <ControlItem>
        <HiSearch size={18} />
      </ControlItem>
      <ControlItem>
        <FiDownload size={18} />
      </ControlItem>
      <ControlItem>
        <FiSettings size={17} />
      </ControlItem>
    </Box>
  );
};

const ControlItem = ({ ...rest }) => (
  <Button
    sx={{
      height: '32px',
      aspectRatio: '1/1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
      '&:hover, &:focus-visible': {
        backgroundColor: 'rgba(255,255,255,0.1)',
      },
    }}
    {...rest}
  />
);
