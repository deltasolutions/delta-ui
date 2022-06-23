import { createFormStory, formStoryMeta } from '../../../../../docs/utils';

export default {
  ...formStoryMeta,
  title: 'JsForm/BaseInput',
};

export const Basics = createFormStory({
  schema: {
    type: 'string',
    title: 'Input',
    description: 'Description',
    layout: {
      placeholder: 'Type anything',
    },
  },
  initialValue: '',
});

export const Mask = createFormStory({
  schema: {
    type: 'string',
    title: 'Input',
    layout: {
      mask: 'aaa000',
    },
  },
  initialValue: '',
});

export const Date = createFormStory({
  schema: {
    type: 'string',
    title: 'Input',
    layout: {
      date: 'DD-MM-YY',
    },
  },
  initialValue: '',
});

export const DateTime = createFormStory({
  schema: {
    type: 'string',
    title: 'Input',
    layout: {
      dateTime: 'DD-MM-YY HH:mm',
    },
  },
  initialValue: '',
});

export const Time = createFormStory({
  schema: {
    type: 'string',
    title: 'Input',
    layout: {
      time: 'HH:mm',
    },
  },
  initialValue: '',
});
