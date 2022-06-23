import { jsx } from '@theme-ui/core';
import dayjs from 'dayjs';
import { FieldProps } from 'delta-jsf';
import { TextInput } from '../../TextInput';

export const BaseInput = (props: FieldProps) => {
  const {
    schema: {
      minimum,
      maximum,
      minLength,
      readOnly,
      type,
      multipleOf,
      layout: { date, dateTime, time, placeholder } = {},
    },
    registry: {
      templates: { PrimitiveTemplate, PanicTemplate },
    },
    value,
    onValue,
  } = props;
  const mappedType =
    typeof date === 'string'
      ? 'date'
      : typeof dateTime === 'string'
      ? 'datetime-local'
      : typeof time === 'string'
      ? 'time'
      : typeof type === 'string'
      ? {
          string: 'text',
          number: 'number',
          integer: 'number',
        }[type]
      : 'text';
  if (!mappedType) {
    return <PanicTemplate {...props}>Invalid schema type</PanicTemplate>;
  }
  const step =
    type === 'integer' && (!multipleOf || multipleOf % 1 !== 0)
      ? 1
      : multipleOf;
  const sanitizeForInput = (v: string) => {
    if (typeof date === 'string') {
      return v ? dayjs(v, date).format('YYYY-MM-DD') : '';
    } else if (typeof dateTime === 'string') {
      return v ? dayjs(v, dateTime).format('YYYY-MM-DDTHH:mm') : '';
    } else if (typeof time === 'string') {
      return v
        ? dayjs('2001-01-01T' + v, 'YYYY-MM-DDT' + time).format('HH:mm')
        : '';
    }
    return String(v ?? '');
  };
  const sanitizeForChange = (v: string | number) => {
    if (typeof date === 'string') {
      return dayjs(v).format(date);
    } else if (typeof dateTime === 'string') {
      return dayjs(v).format(dateTime);
    } else if (typeof time === 'string') {
      return dayjs('2001-01-01T' + v).format(time);
    } else if (mappedType === 'number') {
      return +v;
    }
    return v ?? '';
  };
  return (
    <PrimitiveTemplate {...props}>
      <TextInput
        disabled={readOnly}
        max={maximum}
        min={minimum}
        minLength={minLength}
        placeholder={placeholder ? String(placeholder) : undefined}
        step={step}
        type={(mappedType ?? 'text') as string}
        value={sanitizeForInput(value)}
        onChange={(v: string | number) => {
          onValue?.(sanitizeForChange(v));
        }}
      />
    </PrimitiveTemplate>
  );
};
