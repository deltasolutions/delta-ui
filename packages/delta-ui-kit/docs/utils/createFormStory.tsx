import { jsx } from '@theme-ui/core';
import { Schema } from 'delta-jsf';
import { GenericFormStory } from './GenericFormStory';

export interface FormStoryOptions {
  schema: Schema;
  initialValue: any;
}

export const createFormStory = ({ schema, initialValue }: FormStoryOptions) => {
  const Story = props => <GenericFormStory {...props} />;
  Story.args = { schema, initialValue };
  return Story;
};
