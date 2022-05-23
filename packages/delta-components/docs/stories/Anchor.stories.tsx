import { ComponentMeta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Anchor } from '../../lib';

export default {
  title: 'Interactive/Anchor',
  component: Anchor,
} as ComponentMeta<typeof Anchor>;

export const Basics = () => {
  return <Anchor>Anchor</Anchor>;
};
