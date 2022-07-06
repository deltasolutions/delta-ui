import { jsx } from '@emotion/react';
import { JsForm } from '../../lib';
import { useStoryFormProps } from './useStoryFormProps';

export const GenericFormStory = props => {
  const { schema, ...rest } = props ?? {};
  const formProps = useStoryFormProps({
    schema: schema || {
      type: 'null',
      title: 'Invalid JSON',
    },
    ...rest,
  });
  return <JsForm {...formProps} />;
};
