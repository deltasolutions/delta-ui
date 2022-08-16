import { FieldProps } from '../models';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export const useDefaults = (props: FieldProps) => {
  const {
    value,
    onValue,
    schema: { default: defaultValue },
  } = props;
  useIsomorphicLayoutEffect(() => {
    if (value === undefined && defaultValue) {
      onValue?.(defaultValue);
    }
  }, [value, defaultValue]);
};
