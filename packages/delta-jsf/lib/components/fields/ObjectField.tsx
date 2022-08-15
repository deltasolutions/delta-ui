import React, { Key } from 'react';
import { useDefaults, useIsomorphicLayoutEffect } from '../../hooks';
import { FieldProps, Schema, Validity } from '../../models';
import { clone, getCompressed, getFieldComponent, merge } from '../../utils';

export function ObjectField(props: FieldProps) {
  const {
    schema,
    schema: { layout: { order } = {} },
    registry: {
      templates: { ObjectTemplate, PanicTemplate },
    },
    value,
    validity,
    onValue,
    onValidity,
  } = props;

  useDefaults(props);

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

  useIsomorphicLayoutEffect(() => {
    // An object without values from removed fields.
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
          schema: properties?.[key] as Schema,
          required: required.includes(key),
          value: value?.[key],
          validity: validity?.properties?.[key],
          onValue: v => {
            onValue?.(prior => ({ ...prior, [key]: v }));
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
