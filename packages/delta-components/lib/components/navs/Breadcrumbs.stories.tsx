import { Meta } from '@storybook/react';
import { jsx } from '@theme-ui/core';
import { Anchor } from '../Anchor';
import { Heading } from '../containers';
import { Breadcrumbs } from './Breadcrumbs';

export default {
  title: 'Navs/Breadcrumbs',
} as Meta;

export const Basics = () => {
  return (
    <Heading level={4}>
      <Breadcrumbs>
        <Anchor variant="pure">Home</Anchor>
        <Anchor variant="pure">Categories</Anchor>
        <Anchor variant="pure" sx={{ color: 'accentOnBackground' }}>
          Laptops
        </Anchor>
      </Breadcrumbs>
    </Heading>
  );
};
