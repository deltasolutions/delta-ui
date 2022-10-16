import { jsx } from '@theme-ui/core';
import { forwardRef } from 'react';
import { TextInput, TextInputProps } from '../TextInput';

export const Input = forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    return (
      <TextInput ref={ref} sx={{ height: '32px' }} variant="pure" {...props} />
    );
  }
);
