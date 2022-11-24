import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import appleStock from '@visx/mock-data/lib/mocks/appleStock';
import dayjs from 'dayjs';
import { useDrop } from '../../hooks';
import { Anchor } from '../Anchor';
import { Card, CardBody, CardFooter, CardHeader, Heading } from '../containers';
import { DropMenu, DropMenuItem } from '../inputs';
import { AreaChart } from './AreaChart';
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

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
      <CardBody sx={{ width: '1000px', height: '500px' }} variant="wide">
        <AreaChart
          data={appleStock.slice(0, 50)}
          formatX={v => dayjs(v).format('YYYY-MM-DD')}
          formatXTick={v => dayjs(v).format('YYYY-MM-DD')}
          formatY={v => `${v} Celsius`}
          xAccessor={v => v.date}
          xAngleTicks={-25}
          xScale={{ type: 'band' }}
          xWidthTicks={50}
          yAccessor={v => v.close}
          yScale={{ type: 'linear' }}
        />
      </CardBody>
      <CardFooter>
        <RangePicker />
      </CardFooter>
    </Card>
  );
};

export const Today = () => {
  const data = new Array(11)
    .fill(undefined)
    .map((_, index) => ({
      close: Math.random() * 80,
      date: new Date().getTime() - 1000 * 60 * 60 * index,
    }))
    .reverse();

  return (
    <Card>
      <CardHeader>
        <Heading level={3}>CPU Temperature</Heading>
      </CardHeader>
      <CardBody sx={{ width: '1000px', height: '400px' }} variant="wide">
        <AreaChart
          data={data}
          formatX={v => dayjs(v).format('YYYY-MM-DD')}
          //@ts-ignore
          formatXTick={v => dayjs().to(v)}
          formatY={v => `${v} Celsius`}
          xAccessor={v => v.date}
          xScale={{ type: 'band' }}
          yAccessor={v => v.close}
          yScale={{ type: 'linear' }}
        />
      </CardBody>
      <CardFooter>
        <RangePicker />
      </CardFooter>
    </Card>
  );
};
