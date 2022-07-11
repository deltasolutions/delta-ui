import { jsx } from '@theme-ui/core';
import { FieldProps } from 'delta-jsf';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useDebounce } from '../../../../hooks';
import { Autocomplete, AutocompleteOption } from '../../Autocomplete';

export interface AutocompleteFieldOption {
  title: string;
  const: unknown;
}

export interface AutocompleteFieldSource {
  initials?: AutocompleteFieldOption[];
  onQuery: (
    query: string
  ) => AutocompleteFieldOption[] | Promise<AutocompleteFieldOption[]>;
}

export const AutocompleteField = (props: FieldProps) => {
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
  const optionsFromSchema = multiple
    ? (schema.items as { oneOf: unknown[] })?.oneOf
    : (schema.oneOf as unknown);
  const source = useMemo(
    () =>
      getAutocompleteSource?.(target) as AutocompleteFieldSource | undefined,
    [getAutocompleteSource, target]
  );
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
    const maybeValue = value ?? schema.default;
    return multiple
      ? Array.isArray(maybeValue)
        ? maybeValue
        : []
      : maybeValue;
  };
  const [options, setOptions] = useState(() =>
    sanitizeOptions(optionsFromSchema ?? source?.initials ?? [])
  );
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 200);
  useEffect(() => {
    if (optionsFromSchema || !source) {
      setOptions(sanitizeOptions(optionsFromSchema));
      return;
    }
    const handleOptions = async () => {
      try {
        const options = await source?.onQuery(debouncedQuery);
        setOptions(sanitizeOptions(options));
      } catch {
        setOptions([]);
      }
    };
    handleOptions();
  }, [
    schema,
    debouncedQuery,
    // Ignoring source dependency here, since we simply
    // don't want source change to trigger re-render.
  ]);
  return (
    <PrimitiveTemplate {...props}>
      <Autocomplete
        multiple={multiple}
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
