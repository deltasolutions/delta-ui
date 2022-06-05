import { FileReadOptions } from 'fs/promises';
import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useState } from 'react';
import { compact } from '../../../docs/decorators';
import { Box } from '../containers';
import { FileInput } from '../inputs';
import { FileList } from './FileList';

export default {
  title: 'Displays/FileList',
  decorators: [compact('500px')],
} as Meta;

export const Basics = () => {
  const [files, setFiles] = useState<FileList>();
  const onChange = files => {
    if (!files) {
      return;
    }
    setFiles(files);
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <FileList files={files} sx={{ marginBottom: '30px' }} />
      <FileInput sx={{ marginLeft: 'auto' }} multiple onChange={onChange} />
    </Box>
  );
};
