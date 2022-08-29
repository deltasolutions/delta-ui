import { jsx } from '@theme-ui/core';
import { FieldProps, useDefaults } from 'delta-jsf';
import { Select, SelectOption } from '../../Select';
import { AutocompleteField } from './AutocompleteField';

export const SelectField = (props: FieldProps) => {
  useDefaults(props);
  if (props.schema.type === 'array') {
    console.warn(
      'JsForm: SelectField with type === "array" deprecated. Use Autocomplete instead.'
    );
    return <AutocompleteField {...props} />;
  }
  const {
    schema,
    value,
    onValue,
    registry: {
      templates: { PrimitiveTemplate },
    },
  } = props;
  const { placeholder } = schema.layout ?? {};
  const toPickFrom = schema.oneOf ?? [];
  const sanitizeValue = value => value ?? schema.default;

  return (
    <PrimitiveTemplate {...props}>
      <Select
        placeholder={placeholder ? String(placeholder) : undefined}
        value={sanitizeValue(value)}
        onChange={(v: unknown) => {
          onValue?.(sanitizeValue(v));
        }}
      >
        {toPickFrom.reduce((res, curr, index) => {
          if (typeof curr === 'object' && typeof curr.const === 'string') {
            res.push(
              <SelectOption key={index} value={curr.const}>
                {curr.title || curr.const}
              </SelectOption>
            );
          }
          return res;
        }, [] as JSX.Element[])}
      </Select>
    </PrimitiveTemplate>
  );
};
