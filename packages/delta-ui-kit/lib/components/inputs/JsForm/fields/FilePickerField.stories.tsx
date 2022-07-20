import { createFormStory, formStoryMeta } from '../../../../../docs/utils';

export default {
  ...formStoryMeta,
  title: 'JsForm/GeoLocPicker',
};
export const FilePicker = createFormStory({
  schema: {
    type: 'string',
    title: 'Pick Files',
    layout: {
      field: 'filePicker',
    },
  },
});
