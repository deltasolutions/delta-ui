import { Meta } from '@storybook/react';
import React from 'react';
import { Form } from 'src';
import { formStoryParameters, useStoryFormProps } from 'storybook/utils';

const meta: Meta = {
  title: 'General/Form',
  ...formStoryParameters
};

export default meta;

export const Basics = props => {
  const formProps = useStoryFormProps({
    ...props,
    schema: {
      type: 'object',
      title: 'Form',
      allOf: [
        {
          type: 'object',
          properties: {
            a: {
              type: 'integer',
              title: 'AAA',
              maximum: 5
            }
          }
        },
        {
          type: 'object',
          if: {
            type: 'object',
            properties: {
              a: { const: 5 }
            },
            required: ['a']
          },
          then: {
            type: 'object',
            properties: {
              b: {
                type: 'string',
                title: 'BBB',
                oneOf: [{ const: '1' }, { const: '2' }, { const: '3' }],
                layout: {
                  field: 'select'
                }
              }
            }
          }
        }
      ]
    }
  });
  return <Form {...formProps} />;
};

export const Collections = props => {
  const formProps = useStoryFormProps({
    ...props,
    schema: {
      type: 'array',
      title: 'Collection',
      items: {
        type: 'object',
        properties: {
          name: {
            title: 'Name',
            type: 'string'
          }
        },
        required: ['name']
      }
    }
  });
  return <Form {...formProps} />;
};

export const HiddenField = props => {
  const formProps = useStoryFormProps({
    ...props,
    schema: {
      type: 'object',
      properties: {
        name: {
          title: 'Name',
          type: 'string'
        },
        surname: {
          title: 'Surname',
          type: 'string',
          layout: {
            field: 'hidden'
          }
        }
      }
    },
    initialValue: {
      name: 'Lorem',
      surname: 'Ipsum'
    }
  });
  return <Form {...formProps} />;
};

export const Sandbox = props => {
  const { schema, ...rest } = props ?? {};
  const formProps = useStoryFormProps({
    schema: schema || {
      type: 'null',
      title: 'Invalid JSON'
    },
    ...rest
  });
  return <Form {...formProps} />;
};
Sandbox.args = {
  schema: {
    type: 'object',
    title: 'Please, login',
    properties: {
      username: {
        title: 'Username',
        type: 'string'
      },
      password: {
        title: 'Password',
        type: 'string',
        minLength: 8
      }
    },
    required: ['username', 'password']
  },
  initialValue: {}
};
