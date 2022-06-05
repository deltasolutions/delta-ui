import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useState } from 'react';
import { compact } from '../../../docs/decorators';
import { FileInput } from './FileInput';

export default {
  title: 'Inputs/FileInput',
  decorators: [compact('300px')],
} as Meta;

export const Basics = () => {
  const [files, setFiles] = useState<any>([]);
  return (
    <FileInput
      sx={{ ml: 'auto' }}
      onChange={files => {
        if (!files) {
          return;
        }
        setFiles(files);
      }}
    >
      Select file
    </FileInput>
  );
};
