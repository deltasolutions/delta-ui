import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { compact } from '../../../docs/decorators';
import { Switch } from '../inputs';
import { PairList } from './PairList';

export default {
  title: 'Displays/PairList',
  decorators: [compact('700px')],
} as Meta;

const pairs = [
  ['Name', 'Delta BMC Scan'],
  ['Cron', '*/5 * * * *'],
  [
    'Running',
    'ddsadk jfsodijapso jfpasj fpdjsap ifjsadpoij fpoadsijfp ijadspfij paosijdfp japdsfijapsij fpoijapfi jpasijdf pijapojif d',
  ],
  ['Next Execution', '15.04.2022'],
  ['Last Status', <Switch />],
];

export const Basics = () => <PairList pairs={pairs} />;

export const Column = () => <PairList pairs={pairs} variant="column" />;

export const RowSpace = () => <PairList pairs={pairs} variant="row-space" />;
