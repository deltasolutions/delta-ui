import { createFormStory, formStoryMeta } from '../../../../docs/utils';

export default {
  ...formStoryMeta,
  title: 'JsForm/General',
};

export const Basics = createFormStory({
  schema: {
    type: 'object',
    properties: {
      text: {
        title: 'Text',
        type: 'string',
        description: 'Description',
      },
      switch: {
        title: 'Switch',
        type: 'boolean',
      },
      select: {
        title: 'Select',
        type: 'string',
        oneOf: [
          {
            title: 'A',
            const: 'aaa',
          },
          {
            title: 'B',
            const: 'bbb',
          },
        ],
        layout: {
          field: 'select',
        },
      },
    },
    required: ['select'],
  },
  initialValue: {
    text: 'abcd',
  },
});

export const Array = createFormStory({
  schema: {
    type: 'object',
    properties: {
      username: {
        title: 'Username',
        type: 'string',
      },
      password: {
        title: 'Password',
        type: 'string',
      },
      roles: {
        title: 'Roles',
        type: 'array',
        items: {
          title: 'Name',
          type: 'string',
        },
      },
    },
  },
  initialValue: {},
});

export const LoginForm = createFormStory({
  schema: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        title: 'Username',
      },
      password: {
        type: 'string',
        title: 'Password',
        minLength: 8,
      },
    },
    required: ['username', 'password'],
  },
  initialValue: {},
});
