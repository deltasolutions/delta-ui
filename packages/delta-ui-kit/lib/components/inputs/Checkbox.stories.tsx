import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Checkbox } from './Checkbox';

export default {
  title: 'Inputs/Checkbox',
} as Meta;

export const Basics = () => {
  return <Checkbox />;
};

export const Disabled = () => {
  return <Checkbox disabled />;
};
