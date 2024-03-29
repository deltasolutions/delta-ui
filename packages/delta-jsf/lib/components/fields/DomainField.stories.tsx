import { Meta } from '@storybook/react';
import React from 'react';
import { formStoryParameters, useStoryFormProps } from '../../../docs/utils';
import { Form } from '../Form';

const meta: Meta = {
  title: 'fields/DomainField',
  ...formStoryParameters,
};

export default meta;

export const Basics = props => {
  const formProps = useStoryFormProps({
    ...props,
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
        getDomainSource: () => {
          return {
            schema: {
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
            },
            initialValue: { b: 'ABCD' },
          };
        },
      },
    },
  });
  return <Form {...formProps} />;
};
