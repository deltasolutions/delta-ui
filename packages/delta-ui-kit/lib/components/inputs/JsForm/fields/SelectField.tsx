import { jsx } from '@theme-ui/core';
import { FieldProps } from 'delta-jsf';
import { Select, SelectOption } from '../../Select';

export const SelectField = (props: FieldProps) => {
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
