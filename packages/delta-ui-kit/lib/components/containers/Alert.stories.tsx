import { ComponentStory, Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Alert } from '..';
import { compact } from '../../../docs/decorators';

export default {
  title: 'Containers/Alert',
  component: Alert,
  decorators: [compact('250px')],
} as Meta;

const Template: ComponentStory<typeof Alert> = args => <Alert {...args} />;

export const Basics = Template.bind({});
Basics.args = {
  color: 'success',
  children:
    'Dolore eiusmod proiasjdofjidsjfoisjgoijfgjdfoijgiojdfgoijdfjgdoijgoidjfgoijdfogjodfjodjgfodent aute qui ut aute. Eiusmod tempor amet magna eiusmod reprehenderit non nisi aliquip quis in nostrud pariatur ad voluptate. Velit magna consequat ut consectetur. Nostrud Lorem laboris amet ad reprehenderit in. Nulla ad adipisicing consequat ipsum Lorem labore aute. Laboris incididunt est ex velit eiusmod sit Lorem mollit occaecat culpa incididunt veniam nostrud occaecat. Officia ad non cillum excepteur quis laborum anim adipisicing.',
};
