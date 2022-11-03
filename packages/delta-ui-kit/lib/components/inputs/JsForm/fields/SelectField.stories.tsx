import { createFormStory, formStoryMeta } from '../../../../../docs/utils';

export default {
  ...formStoryMeta,
  title: 'JsForm/Select',
};

export const Basics = createFormStory({
  schema: {
    type: 'string',
    title: 'Select Field',
    oneOf: [
      { title: 'A', const: 'a' },
      { title: 'B', const: 'b' },
      { title: 'C', const: 'c' },
      { title: 'Empty', const: undefined },
    ],
    layout: {
      field: 'select',
      placeholder: 'Empty',
    },
  },
  initialValue: '',
});

export const Multiple = createFormStory({
  schema: {
    type: 'array',
    title: 'Select (multiple)',
    items: {
      oneOf: [
        {
          title: 'A',
          const: 'aaa',
        },
        {
          title: 'B',
          const: 'bbb',
        },
        {
          title: 'C',
          const: 'ccc',
        },
      ],
    },
    layout: {
      field: 'select',
    },
  },
  initialValue: '',
});
