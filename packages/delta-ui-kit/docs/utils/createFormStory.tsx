import { jsx } from '@theme-ui/core';
import { FormManagerOptions } from 'delta-jsf';
import { GenericFormStory } from './GenericFormStory';

export interface FormStoryOptions
  extends Pick<FormManagerOptions, 'schema' | 'initialValue' | 'registry'> {}

export const createFormStory = (options: FormStoryOptions) => {
  const Story = props => <GenericFormStory {...props} />;
  Story.args = options;
  return Story;
};
