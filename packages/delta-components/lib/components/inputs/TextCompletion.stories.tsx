import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Fragment, useState } from 'react';
import { compact } from '../../../docs/decorators';
import { Button } from '../Button';
import { TextCompletion, TextCompletionOption } from './TextCompletion';

export default {
  title: 'Inputs/TextCompletion',
  decorators: [compact('250px')],
} as Meta;

const data = ['First item', 'Second item', 'Third item'];
export const Basics = () => {
  const [options, setOptions] = useState(data);
  return (
    <TextCompletion
      onChange={value =>
        setOptions(
          data.filter(item =>
            item.toLocaleLowerCase().includes(value?.toLocaleLowerCase())
          )
        )
      }
      placeholder="Placeholder"
    >
      {options.map(option => (
        <TextCompletionOption key={option} value={option}>
          {option}
        </TextCompletionOption>
      ))}
    </TextCompletion>
  );
};
