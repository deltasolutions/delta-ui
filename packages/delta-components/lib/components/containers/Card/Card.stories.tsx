import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Heading } from '../Heading';
import { Card } from './Card';
import { CardBody } from './CardBody';
import { CardFooter } from './CardFooter';
import { CardHeader } from './CardHeader';

export default {
  title: 'Containers/Card',
} as Meta;

export const Basics = () => {
  return (
    <Card sx={{ width: '400px' }}>
      <CardHeader>
        <Heading level={4}>Header</Heading>
      </CardHeader>
      <CardBody>Body</CardBody>
      <CardFooter>Footer</CardFooter>
    </Card>
  );
};
