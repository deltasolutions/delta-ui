import { Meta } from '@storybook/react';
import React from 'react';
import { formStoryParameters, useStoryFormProps } from '../../../docs/utils';
import { Form } from '../Form';

const meta: Meta = {
  title: 'fields/NestedField',
  ...formStoryParameters,
};

export default meta;

export const Basics = () => {
  const formProps = useStoryFormProps({
    schema: {
      type: 'object',
      properties: {
        a: {
          title: 'A',
          type: 'string',
        },
        nested: {
          layout: {
            field: 'domain',
          },
        },
      },
      required: ['a'],
    },
    registry: {
      utils: {
        getDomainSchema: () => {
          return {
            type: 'object',
            properties: {
              b: {
                title: 'B',
                type: 'string',
              },
              c: {
                title: 'C',
                type: 'string',
              },
            },
            required: ['b'],
          };
        },
      },
    },
  });
  return <Form {...formProps} />;
};
