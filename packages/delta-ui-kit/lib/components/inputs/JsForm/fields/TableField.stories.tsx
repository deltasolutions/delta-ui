import { createFormStory, formStoryMeta } from '../../../../../docs/utils';

export default {
  ...formStoryMeta,
  title: 'JsForm/Table',
};

export const Basics = createFormStory({
  schema: {
    items: {
      properties: {
        ip: {
          title: 'Ip',
          type: 'string',
        },
        privProtocol: {
          title: 'PrivProtocol',
          type: 'string',
        },
        username: {
          title: 'Username',
          type: 'string',
        },
      },
      required: ['username'],
      type: 'object',
    },
    layout: {
      field: 'table',
    },
    title: 'Table',
    type: 'array',
  },
  initialValue: [{ ip: 'dasdsa', username: 'Default Username ' }],
});
