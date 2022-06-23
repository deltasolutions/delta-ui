import { Validity } from 'delta-jsf';
import { useCallback, useState } from 'react';
import { useJsFormDefaults } from '../../lib';

export const useStoryFieldProps = (props, initialValue: any = undefined) => {
  const [value, setValue] = useState<any>(initialValue);
  const [error, setError] = useState<Validity>({ errors: [] });
  const onValue = useCallback(v => {
    setValue(v);
    props?.onValue?.(v);
  }, []);
  const onError = useCallback(e => {
    setError(e);
    props?.onError?.(e);
  }, []);
  const { registry } = useJsFormDefaults();
  return { value, error, onValue, onError, registry };
};
