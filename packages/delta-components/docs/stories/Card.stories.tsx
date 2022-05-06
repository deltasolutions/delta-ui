import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeading,
  Heading,
  Loader,
  Paragraph
} from '../../lib';

export default {
  title: 'Layout/Card',
  component: Card
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = args => (
  <Card {...args}>
    <CardHeading>
      <Heading>Card heading</Heading>
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
    <CardFooter></CardFooter>
  </Card>
);

export const Basic = Template.bind({});

Basic.args = { size: 'small' };
