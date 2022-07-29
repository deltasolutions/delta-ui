import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useState } from 'react';
import { Button, useQuestion } from '..';

export default {
  title: 'hooks/useQuestion',
} as Meta;

export const Basic = () => {
  const [answer, setAnswer] = useState<string>('');
  const openQuestion = useQuestion(
    {
      heading: 'Important question',
    },
    {
      deps: [],
    }
  );
  return (
    <Button
      variant="contained"
      onClick={async () => {
        const isOk = await openQuestion();
        setAnswer(isOk ? '(yes)' : '(no)');
      }}
    >
      Open {answer}
    </Button>
  );
};
export const Complex = () => {
  const [answer, setAnswer] = useState<string>('');
  const openQuestion = useQuestion(
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
        const isOk = await openQuestion();
        setAnswer(isOk ? '(yes)' : '(no)');
      }}
    >
      Open {answer}
    </Button>
  );
};
