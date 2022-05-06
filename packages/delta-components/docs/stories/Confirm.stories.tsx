import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { useState } from 'react';
import {
  Box,
  Heading,
  Button,
  Dialog,
  Paragraph,
  Confirm,
  ConfirmHeader,
  ConfirmBody,
  ConfirmFooter,
  ConfirmCancelButton,
  ConfirmButton
} from '../../lib';

export default {
  title: 'Dialog/Confirm',
  component: Confirm
} as ComponentMeta<typeof Confirm>;

const Template: ComponentStory<typeof Confirm> = args => {
  const [value, setValue] = useState('undefined');
  return (
    <Box>
      <Dialog
        render={({ close }) => (
          <Confirm>
            <ConfirmHeader>Are you sure?</ConfirmHeader>
            <ConfirmBody>This action cannot be undone.</ConfirmBody>
            <ConfirmFooter>
              <ConfirmCancelButton onClick={close}>Cancel</ConfirmCancelButton>
              <ConfirmButton
                onClick={() => {
                  setValue('confirmed');
                  close();
                }}
              >
                Confirm
              </ConfirmButton>
            </ConfirmFooter>
          </Confirm>
        )}
      >
        <Button size="medium" uppercase zoomable>
          Open confirm
        </Button>
      </Dialog>
      {value}
    </Box>
  );
};

export const Basic = Template.bind({});

Basic.args = {};
