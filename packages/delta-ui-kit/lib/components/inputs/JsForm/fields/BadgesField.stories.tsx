import { createFormStory, formStoryMeta } from '../../../../../docs/utils';

export default {
  ...formStoryMeta,
  title: 'JsForm/Badge',
};

export const Basics = createFormStory({
  schema: {
    items: {
      layout: {
        options: {
          colorMap: [
            {
              color: 'success',
              pattern: true,
            },
            {
              color: 'danger',
              pattern: false,
            },
          ],
        },
      },
      properties: {
        action: {
          layout: {
            field: 'select',
          },
          oneOf: [
            {
              const: 'off',
            },
            {
              const: 'on',
            },
          ],
          title: 'Mode',
          type: 'string',
        },
        delay: {
          maximum: 10000,
          minimum: 500,
          title: 'Delay',
          type: 'integer',
        },
      },
      required: ['action', 'delay'],
      type: 'object',
    },
    layout: {
      field: 'badges',
    },
    type: 'array',
  },
  initialValue: [{ name: 'First default' }, { name: 'Second default' }],
});
