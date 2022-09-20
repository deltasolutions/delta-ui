import { jsx } from '@theme-ui/core';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Button } from '../Button';
import { TextInput } from '.';

export const PasswordInput = props => {
  const [shown, setShown] = useState(false);
  return (
    <TextInput
      {...props}
      endIcon={
        <Button
          sx={{
            borderRadius: '100%',
            aspectRatio: '1 / 1',
            width: '1.5em',
            height: '1.5em',
            '&:hover, &:active, &:focus-visible': {
              color: 'accentOnContext',
            },
          }}
          onClick={() => setShown(prev => !prev)}
        >
          {shown ? (
            <AiOutlineEye sx={{ width: '100%', height: '100%' }} />
          ) : (
            <AiOutlineEyeInvisible sx={{ width: '100%', height: '100%' }} />
          )}
        </Button>
      }
      type={shown ? 'text' : 'password'}
    />
  );
};
