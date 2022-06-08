import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { compact } from '../../../docs/decorators';
import { TextArea } from './TextArea';

export default {
  title: 'Inputs/TextArea',
  decorators: [compact('250px')],
} as Meta;

export const Basics = () => <TextArea placeholder="Placeholder" />;
