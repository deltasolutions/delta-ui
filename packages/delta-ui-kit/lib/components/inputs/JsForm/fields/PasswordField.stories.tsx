import { createFormStory, formStoryMeta } from '../../../../../docs/utils';

export default {
  ...formStoryMeta,
  title: 'JsForm/PasswordField',
};

export const Basics = createFormStory({
  schema: {
    type: 'string',
    title: 'TextArea',
    layout: {
      field: 'password',
    },
  },
  initialValue: '',
});
