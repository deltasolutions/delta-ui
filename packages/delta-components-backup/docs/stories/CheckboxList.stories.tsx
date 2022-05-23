import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeading,
  CheckboxList,
  CheckboxListItem,
  Heading
} from '../../lib';

export default {
  title: 'Inputs/CheckboxList',
  component: CheckboxList
} as ComponentMeta<typeof CheckboxList>;

const Template: ComponentStory<typeof CheckboxList> = ({ ...args }) => {
  const [state, setState] = useState<number[]>([]);
  console.log(state);

  return (
    <Box
      sx={{ width: '300px', display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <Heading>Checkbox list</Heading>
      <Box
        sx={{
          backgroundColor: 'surface',
          pl: 5,
          mt: 4,
          borderRadius: 5
        }}
      >
        <CheckboxList sx={{ height: '400px' }} {...args}>
          {Array.from(Array(30), (_, index) => index + 1).map(n => {
            return (
              <CheckboxListItem
                onChange={e => {
                  if (e.target.checked) {
                    setState(prev => [...prev, n]);
                  } else {
                    setState(prev => prev.filter(item => item !== n));
                  }
                }}
                key={n}
              >
                This is item number {n}
                {n === 3 && (
                  <Box>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Commodi culpa alias, dolorem iusto deleniti obcaecati ipsa
                    praesentium modi corporis, animi maxime eligendi nulla?
                    Aliquid accusamus a velit, harum numquam excepturi.
                  </Box>
                )}
              </CheckboxListItem>
            );
          })}
        </CheckboxList>
      </Box>
      {state.length > 0 && (
        <Button variant="outlined" color="secondary" zoomable>
          Continue
        </Button>
      )}
    </Box>
  );
};

export const Basic = Template.bind({});

Basic.args = {};
