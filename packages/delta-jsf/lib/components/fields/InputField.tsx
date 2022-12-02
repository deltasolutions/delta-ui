import React from 'react';
import { useDefaults } from '../../hooks';
import { FieldProps } from '../../models';

export function InputField(props: FieldProps) {
  const {
    schema: { type, multipleOf, minimum, maximum, readOnly },
    value,
    onValue,
    onValidity,

    validity: { errors } = {},
    registry: {
      templates: { PrimitiveTemplate, PanicTemplate },
    },
  } = props;

  useDefaults(props);

  const inputType =
    typeof type === 'string' &&
    {
      string: 'text',
      number: 'number',
      integer: 'number',
    }[type];

  if (!inputType) {
    return <PanicTemplate {...props}>Invalid schema type</PanicTemplate>;
  }

  const step =
    type === 'integer' && (!multipleOf || multipleOf % 1 !== 0)
      ? 1
      : multipleOf;
  return (
    <PrimitiveTemplate {...props}>
      <input
        disabled={readOnly ?? false}
        max={maximum}
        min={minimum}
        step={step}
        type={inputType}
        value={value?.toString() ?? ''}
        onChange={e => {
          let v: string | number | undefined = e.target.value;
          if (v === '') {
            v = undefined;
          } else if (inputType === 'number') {
            v = +v;
          }
          onValue?.(v);
        }}
      />
    </PrimitiveTemplate>
  );
}
