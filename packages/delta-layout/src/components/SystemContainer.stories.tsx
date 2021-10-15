import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { SystemContainer } from './SystemContainer';

export default {
  title: 'General/SystemContinaer'
} as Meta;

export const Basics = () => <SystemContainer>It works</SystemContainer>;
