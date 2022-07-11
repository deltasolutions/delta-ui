import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import appleStock from '@visx/mock-data/lib/mocks/appleStock';
import dayjs from 'dayjs';
import { useDrop } from '../../hooks';
import { Anchor } from '../Anchor';
import { Card, CardBody, CardFooter, CardHeader, Heading } from '../containers';
import { DropMenu, DropMenuItem } from '../inputs';
import { AreaChart } from './AreaChart';

export default {
  title: 'Displays/AreaChart',
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
      <CardBody sx={{ width: '600px' }} variant="wide">
        <AreaChart
          data={appleStock.slice(0, 30)}
          formatX={v => dayjs(v).format('YYYY-MM-DD')}
          formatY={v => `${v} Celsius`}
          getX={v => v.date}
          getY={v => v.close}
        />
      </CardBody>
      <CardFooter>
        <RangePicker />
      </CardFooter>
    </Card>
  );
};
