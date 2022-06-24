import { createFormStory, formStoryMeta } from '../../../../../docs/utils';

export default {
  ...formStoryMeta,
  title: 'JsForm/BaseInput',
};

export const Basics = createFormStory({
  schema: {
    type: 'string',
    title: 'Base Input',
    description: 'Description',
    layout: {
      placeholder: 'Type anything',
    },
  },
  initialValue: '',
});

export const Date = createFormStory({
  schema: {
    type: 'string',
    title: 'Date',
    layout: {
      date: 'DD-MM-YY',
    },
  },
  initialValue: '',
});

export const DateTime = createFormStory({
  schema: {
    type: 'string',
    title: 'DateTime',
    layout: {
      dateTime: 'DD-MM-YY HH:mm',
    },
  },
  initialValue: '',
});

export const Time = createFormStory({
  schema: {
    type: 'string',
    title: 'Time',
    layout: {
      time: 'HH:mm',
    },
  },
  initialValue: '',
});
