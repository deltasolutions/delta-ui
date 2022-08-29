import {
  useArrayHandlers as useNativeArrayHandlers,
  FieldProps,
  hash,
} from 'delta-jsf';
import { useCallback, useMemo } from 'react';

export interface ArrayHandlersProps extends FieldProps {
  hasIdentFormValue?: boolean;
}

export const useArrayFieldHandlers = (props: ArrayHandlersProps) => {
  const { onValue, value: values } = props;

  const mappedValues = useMemo(() => identifyArray(values) ?? [], [values]);

  const hasIdentFormValue = useMemo(
    () => (values ?? [])?.some(v => v?.id),
    [values]
  );

  const { handleAdd: mayAdd, handleDelete: mayDelete } =
    useNativeArrayHandlers(props);

  const changeValue = useCallback(
    (value: any) =>
      onValue?.(
        hasIdentFormValue
          ? value
          : value.map(({ id, ...rest }) => ({ ...rest }))
      ),
    [onValue, hasIdentFormValue]
  );

  const handleDelete = useCallback(
    (data: any) => changeValue(mappedValues.filter(v => v?.id !== data?.id)),
    [mappedValues]
  );

  const handleChange = useCallback(
    (data: any, prevData: any) =>
      changeValue(mappedValues.map(v => (v?.id !== prevData?.id ? v : data))),
    [mappedValues]
  );

  const handleAdd = useCallback(
    (data: any) => changeValue([...(mappedValues ?? []), data]),
    [mappedValues]
  );

  return {
    values: mappedValues,
    handleChange,
    handleAdd: mayAdd ? handleAdd : undefined,
    handleDelete: mayDelete ? handleDelete : undefined,
  };
};

const identifyArray = (data?: any[]) =>
  Array.isArray(data)
    ? data?.map((datum, index) =>
        typeof datum !== 'object'
          ? datum
          : { id: hash({ ...datum, index }), ...datum }
      )
    : data;
