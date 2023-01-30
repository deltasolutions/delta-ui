import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useEffect, useState } from 'react';
import { compact } from '../../../docs/decorators';
import { PairList } from './PairList';

export default {
  title: 'Displays/PairList',
  decorators: [compact('700px')],
} as Meta;

const pairs = [
  ['Name', 'Delta BMC Scan'],
  ['Cron', '*/5 * * * *'],
  ['Running', 'ddsadk '],
  ['Next Execution', '15.04.2022'],
];

export const Basics = () => <PairList pairs={pairs} />;

export const Async = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setLoading(prev => !prev);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return <PairList loading={loading} pairs={pairs} />;
};

export const Column = () => <PairList pairs={pairs} variant="column" />;

export const RowSpace = () => <PairList pairs={pairs} variant="row-space" />;
