import { createFormStory, formStoryMeta } from '../../../../../docs/utils';

export default {
  ...formStoryMeta,
  title: 'JsForm/Badge',
};

export const Basics = createFormStory({
  schema: {
    items: {
      properties: {
        name: {
          title: 'Name',
          type: 'string',
        },
      },
      required: ['name'],
      type: 'object',
    },
    layout: {
      field: 'badge',
    },
    title: 'Table',
    type: 'array',
  },
  initialValue: [{ name: 'First default' }, { name: 'Second default' }],
});
