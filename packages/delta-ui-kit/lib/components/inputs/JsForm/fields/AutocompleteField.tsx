import { jsx } from "@theme-ui/core";
import { FieldProps } from "delta-jsf";
import { ReactNode, useEffect, useState } from "react";
import { useDebounce } from "../../../../hooks";
import { Autocomplete, AutocompleteOption } from "../../Autocomplete";

export interface AutocompleteOptionsInit {
  target?: unknown;
  query?: string;
  value?: unknown;
}

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
  const { placeholder, target } = schema.layout ?? {};
  const multiple = schema.type === "array";
  const optionsFromSchema = multiple
    ? (schema.items as { oneOf: unknown[] })?.oneOf
    : (schema.oneOf as unknown);
  const sanitizeOptions = (
    data: unknown,
  ): {
    title: string;
    const: unknown;
    render?: () => ReactNode;
  }[] => {
    return Array.isArray(data)
      ? data.reduce(
        (p, v) =>
          typeof v === "object" && typeof v.title === "string" && "const" in v
            ? [...p, v]
            : p,
        [],
      )
      : [];
  };
  const sanitizeValue = (value) => {
    const maybeValue = value ?? schema.default;
    return multiple ? Array.isArray(maybeValue) ? maybeValue : [] : maybeValue;
  };
  const [options, setOptions] = useState(() => {
    if (optionsFromSchema) {
      return sanitizeOptions(optionsFromSchema);
    }
    // Is options getter is ready to return options for initial value
    // (without server-related or other promise-based response),
    // then we definitely should use it.
    const maybeOptions = getAutocompleteOptions({ target, value });
    return Array.isArray(maybeOptions) ? maybeOptions : [];
  });
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 200);
  useEffect(() => {
    if (optionsFromSchema || !getAutocompleteOptions) {
      setOptions(sanitizeOptions(optionsFromSchema));
      return;
    }
    const handleOptions = async () => {
      try {
        const init: AutocompleteOptionsInit = { target, query: debouncedQuery };
        const options = await getAutocompleteOptions(init);
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
            key={i + "-" + v.title}
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
