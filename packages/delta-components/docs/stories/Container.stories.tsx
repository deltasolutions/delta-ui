import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx, useThemeUI } from '@theme-ui/core';
import {
  Box,
  Container,
  Card,
  CardBody,
  CardHeading,
  CardFooter,
  encoreDarkScheme,
  Heading
} from '../../lib';

export default {
  title: 'Container',
  component: Container
} as ComponentMeta<typeof Container>;

const Template: ComponentStory<typeof Container> = args => {
  return (
    <Container {...args}>
      <Card>
        <CardHeading>
          <Heading level={1}>Theme provided by Container</Heading>
        </CardHeading>
        <CardBody>
          <ContainerChild />
        </CardBody>
      </Card>
    </Container>
  );
};
const ContainerChild = () => {
  const theme = useThemeUI();
  return (
    <Box>
      <pre>{JSON.stringify(theme, null, 4)}</pre>
    </Box>
  );
};
export const Basic = Template.bind({});

Basic.args = {
  theme: encoreDarkScheme
};
