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
      { const: 'a', title: 'A' },
      { const: 'b', title: 'B' },
      { const: 'c', title: 'C' },
    ],
    layout: {
      field: 'select',
    },
  },
  initialValue: '',
});
