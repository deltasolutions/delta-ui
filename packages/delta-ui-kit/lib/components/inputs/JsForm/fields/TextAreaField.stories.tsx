import { createFormStory, formStoryMeta } from '../../../../../docs/utils';

export default {
  ...formStoryMeta,
  title: 'JsForm/TextArea',
};

export const Basics = createFormStory({
  schema: {
    type: 'string',
    title: 'TextArea',
    layout: {
      field: 'text-area',
    },
  },
  initialValue: '',
});
