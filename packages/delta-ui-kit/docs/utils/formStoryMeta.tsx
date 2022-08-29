import { jsx } from '@theme-ui/core';
import { Card, CardBody } from '../../lib';

export const formStoryMeta = {
  parameters: {
    layout: 'fullscreen' as const,
    docs: { source: { type: 'code' } },
  },
  decorators: [
    Story => (
      <Card
        sx={{
          maxWidth: '100%',
        }}
      >
        <CardBody>
          <Story />
        </CardBody>
      </Card>
    ),
  ],
  argTypes: {
    onValue: {
      action: 'onValue',
      table: { disable: true },
    },
    onError: {
      action: 'onError',
      table: { disable: true },
    },
    onSubmit: {
      action: 'onSubmit',
      table: { disable: true },
    },
  },
};
