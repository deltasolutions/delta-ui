import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Fragment } from 'react';
import { Box, Heading, HeadingProps } from '../../lib';
export default {
  title: 'Heading',
  component: Heading
} as ComponentMeta<typeof Heading>;

const Template: ComponentStory<typeof Heading> = args => (
  <Box sx={{ gap: 4, display: 'flex', flexDirection: 'column' }}>
    {[1, 2, 3, 4, 5, 6].map(level => (
      <Heading key={level} level={level as HeadingProps['level']}>
        Heading level {level}
      </Heading>
    ))}
  </Box>
);

export const Basic = Template.bind({});

Basic.args = {};
