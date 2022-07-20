import { createFormStory, formStoryMeta } from '../../../../../docs/utils';

export default {
  ...formStoryMeta,
  title: 'JsForm/FilePicker',
};
export const FilePicker = createFormStory({
  schema: {
    title: 'Pick Files',
    layout: {
      field: 'file-picker',
    },
  },
});
