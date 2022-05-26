import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { PairList } from './PairList';

export default {
  title: 'Displays/PairList',
} as Meta;

const pairs = [
  ['Name', 'Delta BMC Scan'],
  ['Cron', '*/5 * * * *'],
  ['Running', 'False'],
  ['Next Execution', '15.04.2022'],
  ['Last Status', 'SUCCESS'],
];

export const Basics = () => <PairList pairs={pairs} />;

export const Column = () => <PairList variant="column" pairs={pairs} />;
