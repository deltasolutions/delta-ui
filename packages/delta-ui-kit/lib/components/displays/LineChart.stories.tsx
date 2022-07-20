import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { useDrop } from '../../hooks';
import { Anchor } from '../Anchor';
import { Card, CardBody, CardFooter, CardHeader, Heading } from '../containers';
import { DropMenu, DropMenuItem } from '../inputs';
import { LineChart } from './LineChart';

export default {
  title: 'Displays/LineChart',
} as Meta;

const RangePicker = () => {
  const [openDrop, anhorRef] = useDrop(
    props => (
      <DropMenu selectedValues={['a']} sx={{ width: '160px' }} {...props}>
        <DropMenuItem value="a">Last 10 minutes</DropMenuItem>
        <DropMenuItem value="b">Last hour</DropMenuItem>
        <DropMenuItem value="c">Last month</DropMenuItem>
        <DropMenuItem value="d">All time</DropMenuItem>
      </DropMenu>
    ),
    { deps: [], placement: 'bottom-end' }
  );
  return (
    <Anchor
      ref={anhorRef}
      sx={{ cursor: 'default' }}
      variant="pure"
      onClick={() => openDrop()}
    >
      Last 10 minutes
    </Anchor>
  );
};

export const Basics = () => {
  return (
    <Card>
      <CardHeader>
        <Heading level={3}>CPU Temperature</Heading>
      </CardHeader>
      <CardBody sx={{ height: '500px', width: '700px' }} variant="wide">
        <LineChart />
      </CardBody>
      <CardFooter>
        <RangePicker />
      </CardFooter>
    </Card>
  );
};

const data = [
  {
    country: 'DENMARK',
    currency: 'RDDUSD',
    type: 'RENEWABLE',
    year: 1975,
    amount: 0.804,
  },
  {
    country: 'DENMARK',
    currency: 'RDDUSD',
    type: 'RENEWABLE',
    year: 1976,
    amount: 1.35,
  },
  {
    country: 'DENMARK',
    currency: 'RDDUSD',
    type: 'RENEWABLE',
    year: 1977,
    amount: 7.928,
  },
  {
    country: 'DENMARK',
    currency: 'RDDUSD',
    type: 'RENEWABLE',
    year: 1978,
    amount: 15.357,
  },
  {
    country: 'DENMARK',
    currency: 'RDDUSD',
    type: 'RENEWABLE',
    year: 1979,
    amount: 28.926,
  },
];
