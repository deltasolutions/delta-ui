import { createFormStory, formStoryMeta } from '../../../../../docs/utils';

export default {
  ...formStoryMeta,
  title: 'JsForm/ColorPicker',
};

export const Basics = createFormStory({
  schema: {
    type: 'string',
    title: 'ColorPocler Field',
    layout: {
      field: 'color-picker',
    },
  },
});
