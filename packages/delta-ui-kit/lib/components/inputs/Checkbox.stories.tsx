import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Card, CardBody } from '../containers';
import { Checkbox } from './Checkbox';

export default {
  title: 'Inputs/Checkbox',
} as Meta;

export const Contained = () => {
  return <Checkbox variant="contained" />;
};
export const Outlined = () => {
  return (
    <Card>
      <CardBody>
        <Checkbox variant="outlined" />
      </CardBody>
    </Card>
  );
};

export const Disabled = () => {
  return <Checkbox disabled />;
};
