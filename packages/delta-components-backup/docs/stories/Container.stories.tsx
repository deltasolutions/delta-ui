import { ComponentMeta, ComponentStory } from '@storybook/react';
import { jsx, useThemeUI } from '@theme-ui/core';
import {
  Box,
  Container,
  Card,
  CardBody,
  CardHeading,
  CardFooter,
  darkTheme,
  Heading,
  useTheme
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
  const theme = useTheme();
  return (
    <Box>
      <pre>{JSON.stringify(theme, null, 4)}</pre>
    </Box>
  );
};
export const Basic = Template.bind({});

Basic.args = {
  theme: darkTheme
};
