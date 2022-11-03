import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { FiChevronDown, FiDownload, FiSettings } from 'react-icons/fi';
import { HiSearch } from 'react-icons/hi';
import { compact } from '../../../../docs/decorators';
import { Button } from '../../Button';
import { Box, Card, CardBody, CardHeader, Heading } from '../../containers';
import { Checkbox } from '../../inputs';
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

export const Basics = ({ stickyOffset = 0 }) => {
  return (
    <Card>
      <CardBody>
        <Table>
          <TableHeader stickyOffset={stickyOffset}>
            <TableHeaderRow>
              <TableHeaderCell sx={{ width: '300px' }}>
                <span>Id</span>
              </TableHeaderCell>
              <TableHeaderCell>
                <span>Name</span>
                <Button sx={{ borderRadius: '100%' }}>
                  <FiChevronDown />
                </Button>
              </TableHeaderCell>
              <TableHeaderCell>
                <span>Description</span>
              </TableHeaderCell>
            </TableHeaderRow>
          </TableHeader>
          <TableBody>
            {new Array(30).fill(undefined).map((_, index) => (
              <TableBodyRow key={index}>
                <TableBodyCell>
                  <Checkbox variant="outlined" />
                </TableBodyCell>
                <TableBodyCell>Name {index}</TableBodyCell>
                <TableBodyCell>
                  Description mfjdso f odisjf fodisjgopif jgpoisdjfgoijsdfopi
                  gjsdpfijg {index}
                </TableBodyCell>
              </TableBodyRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
};

export const InCard = ({
  heading = <Heading level={3}>Devices</Heading>,
  stickyOffset = 0,
}) => {
  return (
    <Card>
      <CardHeader>
        {heading}
        <Controls />
      </CardHeader>
      <CardBody variant="wide">
        <Basics stickyOffset={stickyOffset} />
      </CardBody>
    </Card>
  );
};

const Controls = () => {
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
      color: 'onContext',
      borderRadius: 4,
      '&:hover, &:focus-visible': {
        backgroundColor: 'accentContext',
      },
    }}
    {...rest}
  />
);
