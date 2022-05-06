import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeading,
  Heading,
  Loader,
  Paragraph,
  ResizableBox
} from '../../lib';

export default {
  title: 'Layout/ResizableBox',
  component: ResizableBox
} as ComponentMeta<typeof ResizableBox>;

const Template: ComponentStory<typeof ResizableBox> = args => (
  <ResizableBox {...args}>
    <Card size="auto">
      <CardHeading>
        <Heading>Resize this box and watch the console</Heading>
        <Loader />
      </CardHeading>
      <CardBody>
        <Paragraph>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus vero
          dolore dolorum amet similique qui ipsa, tempora quisquam sit eveniet
          laudantium. Modi esse voluptas odit accusamus libero excepturi ullam
          amet.
        </Paragraph>
      </CardBody>
    </Card>
  </ResizableBox>
);

export const Basic = Template.bind({});

Basic.args = {
  axis: ['e'],
  maxWidth: 1000,
  minWidth: 400,
  width: 600,
  onResize: console.log
};
