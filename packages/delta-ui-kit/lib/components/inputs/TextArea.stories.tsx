import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useState } from 'react';
import { compact } from '../../../docs/decorators';
import { TextArea } from './TextArea';

export default {
  title: 'Inputs/TextArea',
  decorators: [compact('250px')],
} as Meta;

export const Basics = () => {
  const [v, setV] = useState<string | undefined>('some text');
  console.log('v', v);
  return <TextArea placeholder="Placeholder" value={v} onChange={setV} />;
};
