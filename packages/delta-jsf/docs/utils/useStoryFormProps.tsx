import React from 'react';
import {
  defaults,
  useFormManager,
  FormProps,
  FormManagerOptions,
} from '../../lib';

export const useStoryFormProps = <T extends unknown>(
  options: FormManagerOptions<T>
): FormProps<T | undefined> => {
  const manager = useFormManager<T, FormManagerOptions<T>>({
    ...options,
    registry: defaults.registry,
  });
  return {
    manager,
    children: (
      <div style={{ marginTop: '1rem' }}>
        <button type="submit">
          {manager.isSubmitted ? 'Submit again' : 'Submit'}{' '}
          {manager.isValid ? 'valid' : 'invalid'}
        </button>
      </div>
    ),
  };
};
