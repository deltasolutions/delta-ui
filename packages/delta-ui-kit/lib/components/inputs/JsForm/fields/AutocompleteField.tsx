import { jsx } from '@theme-ui/core';
import { FieldProps, useDefaults } from 'delta-jsf';
import { useMemo } from 'react';
import { hash } from '../../../../utils';
import { Autocomplete, AutocompleteProps } from '../../Autocomplete';

export interface AutocompleteFieldSource
  extends Pick<
    AutocompleteProps,
    'getOptions' | 'renderOption' | 'renderSelection'
  > {}

export const AutocompleteField = (props: FieldProps) => {
  useDefaults(props);
  const {
    schema,
    value,
    onValue,
    registry: {
      templates: { PrimitiveTemplate },
      utils: { getAutocompleteSource },
    },
  } = props;
  const { placeholder, target } = schema.layout ?? {};
  const multiple = schema.type === 'array';
  const oneOf = multiple
    ? (schema.items as { oneOf: unknown[] })?.oneOf
    : (schema.oneOf as unknown);
  const source = useMemo(
    () =>
      getAutocompleteSource?.(target) as AutocompleteFieldSource | undefined,
    [getAutocompleteSource, hash(target)]
  );
  const getOptions = useMemo(() => {
    if (Array.isArray(oneOf)) {
      return (query: string) =>
        oneOf
          .map(v => v.const)
          .filter(
            v =>
              isAlike(query, getTitleFromOneOf(oneOf, v)) || isAlike(query, v)
          );
    }
    return source?.getOptions;
  }, [oneOf, source]);
  const renderOption = useMemo(() => {
    return Array.isArray(oneOf)
      ? (v: unknown) => getTitleFromOneOf(oneOf, v)
      : source?.renderOption;
  }, [oneOf, source]);
  const renderSelection = useMemo(() => {
    return Array.isArray(oneOf)
      ? (v: unknown) => getTitleFromOneOf(oneOf, v)
      : source?.renderSelection;
  }, [oneOf, source]);
  return (
    <PrimitiveTemplate {...props}>
      <Autocomplete
        getOptions={getOptions}
        multiple={multiple}
        placeholder={placeholder ? String(placeholder) : undefined}
        renderOption={renderOption}
        renderSelection={renderSelection}
        value={value}
        onChange={onValue}
      />
    </PrimitiveTemplate>
  );
};

const getTitleFromOneOf = (oneOf: unknown, value: unknown) => {
  if (!Array.isArray(oneOf)) {
    return '–';
  }
  return (
    oneOf.find(v => v.const === value)?.title ??
    (isPrimitive(value) ? String(value) : '–')
  );
};

const isPrimitive = (v: unknown): v is 'number' | 'string' =>
  typeof v === 'string' || typeof v === 'number';

const isAlike = (query: string, option: unknown) =>
  !query ||
  (isPrimitive(option) &&
    String(option).toLocaleLowerCase().includes(query.toLocaleLowerCase()));
