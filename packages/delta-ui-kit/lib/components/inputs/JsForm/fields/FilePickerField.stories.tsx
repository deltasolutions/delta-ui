import { createFormStory, formStoryMeta } from '../../../../../docs/utils';

export default {
  ...formStoryMeta,
  title: 'JsForm/FilePicker',
};

export const Basics = createFormStory({
  schema: {
    type: 'object',
    properties: {
      name: {
        title: 'Name',
        type: 'string',
      },
      file: {
        title: 'File',
        layout: {
          field: 'file-picker',
        },
      },
    },
  },
});

export const MimeFilter = createFormStory({
  schema: {
    type: 'object',
    properties: {
      name: {
        title: 'Name',
        type: 'string',
      },
      file: {
        title: 'File',
        layout: {
          field: 'file-picker',
          accept: 'image/jpeg',
        },
      },
    },
  },
});
