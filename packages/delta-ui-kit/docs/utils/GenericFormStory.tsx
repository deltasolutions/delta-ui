import { jsx } from '@theme-ui/core';
import { Box, Button, JsForm } from '../../lib';
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
  return <JsForm sx={{ minWidth: '300px' }} {...formProps} />;
};
