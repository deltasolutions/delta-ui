import { jsx } from '@theme-ui/core';
import { FieldProps } from 'delta-jsf';
import { ReactNode, useEffect, useState } from 'react';
import { useDebounce } from '../../../../hooks';
import { Autocomplete, AutocompleteOption } from '../../Autocomplete';

export const AutocompleteField = (props: FieldProps) => {
  const {
    schema,
    value,
    onValue,
    registry: {
      templates: { PrimitiveTemplate },
      utils: { getAutocompleteOptions },
    },
  } = props;
  const { placeholder, source } = schema.layout ?? {};
  const { oneOf: optionsFromSchema } = (schema.items ?? {}) as {
    [key: string]: unknown;
  };
  const sanitizeOptions = (
    data: unknown
  ): {
    title: string;
    const: unknown;
    render?: () => ReactNode;
  }[] => {
    return Array.isArray(data)
      ? data.reduce(
          (p, v) =>
            typeof v === 'object' && typeof v.title === 'string' && 'const' in v
              ? [...p, v]
              : p,

          []
        )
      : [];
  };
  const sanitizeValue = value => {
    const maybeArray = value ?? schema.default;
    return Array.isArray(maybeArray) ? maybeArray : [];
  };
  const [options, setOptions] = useState(sanitizeOptions(optionsFromSchema));
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 200);
  useEffect(() => {
    if (optionsFromSchema || !getAutocompleteOptions) {
      setOptions(sanitizeOptions(optionsFromSchema));
      return;
    }
    const handleOptions = async () => {
      try {
        const options = await getAutocompleteOptions(debouncedQuery, source);
        setOptions(sanitizeOptions(options));
      } catch {
        setOptions([]);
      }
    };
    handleOptions();
  }, [schema, debouncedQuery]);
  return (
    <PrimitiveTemplate {...props}>
      <Autocomplete
        placeholder={placeholder ? String(placeholder) : undefined}
        query={query}
        value={sanitizeValue(value)}
        onChange={(v: unknown) => {
          onValue?.(sanitizeValue(v));
        }}
        onQuery={setQuery}
      >
        {options.map((v, i) => (
          <AutocompleteOption
            key={i + '-' + v.title}
            title={v.title}
            value={v.const}
          >
            {v.render?.() ?? v.title}
          </AutocompleteOption>
        ))}
      </Autocomplete>
    </PrimitiveTemplate>
  );
};