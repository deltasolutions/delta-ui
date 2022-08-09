import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Card, CardBody } from '../containers';
import { Checkbox } from './Checkbox';

export default {
  title: 'Inputs/Checkbox',
} as Meta;

export const Basics = () => {
  return (
    <Card>
      <CardBody sx={{ display: 'flex', gap: 3 }}>
        <Checkbox variant="contained" />
        <Checkbox variant="outlined" />
      </CardBody>
    </Card>
  );
};

export const Disabled = () => {
  return <Checkbox disabled />;
};
