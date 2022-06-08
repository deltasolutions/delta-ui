import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useState } from 'react';
import { compact } from '../../../../docs/decorators';
import { TextCompletion } from './TextCompletion';
import { TextCompletionOption } from './TextCompletionOption';
export default {
  title: 'Inputs/TextCompletion',
  decorators: [compact('250px')],
} as Meta;

const data = ['First item', 'Second item', 'Third item'];

export const Basics = () => {
  const [options, setOptions] = useState(data);
  return (
    <TextCompletion
      placeholder="Placeholder"
      onChange={value =>
        setOptions(
          data.filter(item =>
            item.toLocaleLowerCase().includes(value?.toLocaleLowerCase())
          )
        )
      }
    >
      {options.map(option => (
        <TextCompletionOption key={option} value={option}>
          {option}
        </TextCompletionOption>
      ))}
    </TextCompletion>
  );
};
