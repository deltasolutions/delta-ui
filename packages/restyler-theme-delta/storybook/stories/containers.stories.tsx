/** @jsx jsx */
import { Meta } from '@storybook/react';
import { useMemo, useState } from 'react';
import * as R from 'restyler';
import { jsx } from 'theme-ui';
import { compact } from '../decorators';

export default {
  title: 'General/Containers'
} as Meta;

export const Card = () => (
  <R.Card>
    <R.CardHeader>Header</R.CardHeader>
    <R.CardBody>Body</R.CardBody>
    <R.CardFooter>Footer</R.CardFooter>
  </R.Card>
);
Card.decorators = [compact()];
Card.parameters = {
  backgrounds: { default: 'lightGrey' }
};

export const Collapse = () => {
  const [isOpen, setIsOpen] = useState(false);
  const content = useMemo(
    () => (
      <R.Box
        sx={{
          marginTop: 2,
          height: '100px',
          backgroundColor: 'primary'
        }}
      />
    ),
    []
  );
  return (
    <R.Box>
      <R.Button kind="primary" onClick={() => setIsOpen(!isOpen)}>
        Toggle
      </R.Button>
      <R.Collapse isOpen={isOpen}>{content}</R.Collapse>
    </R.Box>
  );
};
