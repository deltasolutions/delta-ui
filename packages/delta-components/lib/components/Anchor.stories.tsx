import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Anchor } from './Anchor';

export default {
  title: 'Interactive/Anchor',
  component: Anchor,
} as Meta;

export const Basics = () => {
  return <Anchor>Anchor</Anchor>;
};
