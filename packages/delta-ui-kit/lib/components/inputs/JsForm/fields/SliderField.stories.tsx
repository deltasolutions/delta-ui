import { createFormStory, formStoryMeta } from '../../../../../docs/utils';

export default {
  ...formStoryMeta,
  title: 'JsForm/Slider',
};

export const Basics = createFormStory({
  schema: {
    type: 'number',
    title: 'Slider Field',
    minimum: 0,
    maximum: 100,
    layout: {
      field: 'slider',
    },
  },
});
