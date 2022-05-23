import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useState } from 'react';
import { Button, useConfirm } from '../../lib';

export default {
  title: 'hooks/useConfirm',
} as Meta;

export const Basics = () => {
  const [answer, setAnswer] = useState<string>('');
  const confirm = useConfirm(
    {
      heading: 'Important question',
      content: 'Are you sure you want to continue?',
    },
    {
      deps: [],
    }
  );
  return (
    <Button
      variant="contained"
      onClick={async () => {
        const isOk = await confirm();
        setAnswer(isOk ? '(yes)' : '(no)');
      }}
    >
      Open {answer}
    </Button>
  );
};
