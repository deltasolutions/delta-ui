import React from 'react';
import {
  defaults,
  FormManagerOptions,
  FormProps,
  useFormManager,
} from '../../lib';

export const useStoryFormProps = <T extends unknown>(
  options: FormManagerOptions<T>
): FormProps<T | undefined> => {
  const manager = useFormManager<T, FormManagerOptions<T>>({
    ...options,
    registry: {
      ...defaults.registry,
      ...options.registry,
    },
  });
  return {
    manager,
    children: (
      <div style={{ marginTop: '1rem' }}>
        <button type="submit">
          {manager.submitted ? 'Submitted' : 'Submit'}
          {manager.valid ? ' (valid)' : ' (invalid)'}
        </button>
      </div>
    ),
  };
};
