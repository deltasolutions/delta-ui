import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { compact } from '../../../../docs/decorators';
import { FilePicker } from '../FilePicker';

export default {
  title: 'Inputs/FilePicker',
  decorators: [compact('300px')],
} as Meta;

export const Basics = () => {
  return (
    <FilePicker
      multiple={true}
      onChange={fileList => {
        console.log('fileList', fileList);
      }}
    />
  );
};

export const MimeFilter = () => {
  return (
    <FilePicker
      accept="image/jpeg"
      multiple={true}
      onChange={fileList => {
        console.log('fileList', fileList);
      }}
    />
  );
};
