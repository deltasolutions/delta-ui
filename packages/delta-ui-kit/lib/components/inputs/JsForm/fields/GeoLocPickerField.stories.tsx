import { createFormStory, formStoryMeta } from '../../../../../docs/utils';

export default {
  ...formStoryMeta,
  title: 'JsForm/GeoLocPicker',
};

export const Basics = createFormStory({
  schema: {
    type: 'object',
    title: 'GeoLocPicker',
    layout: {
      field: 'geoLocPicker',
    },
  },
  initialValue: {},
});
