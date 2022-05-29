import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { compact } from '../../../docs/decorators';
import { FileInput } from './FileInput';

export default {
  title: 'Inputs/FileInput',
  decorators: [compact('300px')],
} as Meta;

export const Basics = () => {
  return (
    <FileInput>
      {names => (names.length > 0 ? names.join(', ') : 'Select File')}
    </FileInput>
  );
};
