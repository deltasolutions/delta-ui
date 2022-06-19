import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Account } from './Account';
import { Anchor } from './Anchor';

export default {
  title: 'Navs/Account',
  component: Anchor,
} as Meta;

export const Basics = () => {
  return <Account>root</Account>;
};
