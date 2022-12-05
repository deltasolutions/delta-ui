import required from 'ajv/dist/vocabularies/validation/required';
import React, { Component, Key } from 'react';
import { useDefaults, useIsomorphicLayoutEffect } from '../../hooks';
import { FieldProps, Schema } from '../../models';
import { getCompressed, getFieldComponent } from '../../utils';

export function ObjectField(props: FieldProps) {
  useDefaults(props);

  const {
    schema,
    schema: { layout: { order } = {}, readOnly },
    registry: {
      templates: { ObjectTemplate, PanicTemplate },
    },
    value,
    validity,
    onValue,
    onValidity,
  } = props;

  const { properties = {}, required = [] } = getCompressed(schema, value);
  const keys = new Set(Object.keys(properties));
  const sortedKeys = (Array.isArray(order) ? order : [])
    .map(v => v?.toString() ?? '')
    .reduce((prev, curr) => {
      if (keys.has(curr)) {
        prev.push(curr);
        keys.delete(curr);
        return prev;
      }
      return prev;
    }, [] as string[])
    .concat(Array.from(keys));

  // Removing properties which might be
  // removed in the process of schema changes.
  useIsomorphicLayoutEffect(() => {
    const filtered = { ...value };
    const availableKeys = new Set(Object.keys(properties));
    let hasToUpdate = false;
    Object.keys(value ?? {}).forEach(k => {
      if (!availableKeys.has(k)) {
        filtered[k] = undefined;
        hasToUpdate = true;
      }
    });
    if (hasToUpdate) {
      onValue?.(filtered);
    }
  }, [sortedKeys.join()]);

  return (
    <ObjectTemplate {...props}>
      {sortedKeys.map(key => {
        const sub: FieldProps & { key: Key } = {
          key,
          ...props,
          schema: { readOnly, ...(properties?.[key] as Schema) },
          required: required.includes(key),
          value: value?.[key],
          validity: validity?.properties?.[key],
          onValue: v => {
            onValue?.({ ...value, [key]: v });
          },
          onValidity: v => {
            onValidity?.(
              v instanceof Promise
                ? (async () => ({ properties: { [key]: await v } }))()
                : { properties: { [key]: v } }
            );
          },
        };
        if (typeof sub.schema !== 'object') {
          return (
            <PanicTemplate {...sub}>
              Object properties must be a valid JSONSchema
            </PanicTemplate>
          );
        }
        const Component = getFieldComponent(sub);
        return <Component {...sub} />;
      })}
    </ObjectTemplate>
  );
}
