import React from 'react';
import { useDefaults } from '../../hooks';
import { FieldProps } from '../../models';

export function SelectField(props: FieldProps) {
  const {
    schema,
    value,
    onValue,
    registry: {
      templates: { PrimitiveTemplate, PanicTemplate }
    }
  } = props;

  useDefaults(props);

  const { type, oneOf, layout: { placeholder } = {} } = schema;

  if (type !== 'string') {
    return (
      <PanicTemplate {...props}>Select field: type must "string"</PanicTemplate>
    );
  }

  if (
    !oneOf ||
    !oneOf.every(
      v => typeof v === 'object' && typeof (v.title ?? v.const) === 'string'
    )
  ) {
    return (
      <PanicTemplate {...props}>
        Select field: invalid "oneOf" schema
      </PanicTemplate>
    );
  }

  return (
    <PrimitiveTemplate {...props}>
      <select
        value={value ?? ''}
        onChange={e => {
          let v: string | number | undefined = e.target.value;
          if (v === '') {
            v = undefined;
          }
          onValue?.(v);
        }}
      >
        {typeof placeholder === 'string' && (
          <option hidden disabled value="">
            {placeholder ?? ''}
          </option>
        )}
        {oneOf.map((v: { const: string; title?: string }) => (
          <option key={v.const} value={v.const}>
            {v.title ?? v.const}
          </option>
        ))}
      </select>
    </PrimitiveTemplate>
  );
}
