import React, { Key, useEffect, useState } from 'react';
import {
  useDefaults,
  useIsomorphicLayoutEffect,
  useUpdateEffect,
} from '../../hooks';
import { FieldProps, Schema } from '../../models';
import { getCompressed, getFieldComponent } from '../../utils';

export function ObjectField(props: FieldProps) {
  useDefaults(props);

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

  const [innerValue, setInnerValue] = useState<{ [key: string]: unknown }>(
    value
  );

  const { properties = {}, required = [] } = getCompressed(schema, innerValue);
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

  // Handling the case of changed keys set –
  // removing unneeded data.
  useIsomorphicLayoutEffect(() => {
    const filtered = { ...innerValue };
    const availableKeys = new Set(Object.keys(properties));
    let hasToUpdate = false;
    Object.keys(innerValue ?? {}).forEach(k => {
      if (!availableKeys.has(k)) {
        filtered[k] = undefined;
        hasToUpdate = true;
      }
    });
    if (hasToUpdate) {
      setInnerValue(filtered);
    }
  }, [sortedKeys.join()]);

  useUpdateEffect(() => {
    value !== innerValue && setInnerValue(value);
  }, [value]);

  useEffect(() => {
    value !== innerValue && onValue?.(innerValue);
  }, [innerValue]);

  return (
    <ObjectTemplate {...props}>
      {sortedKeys.map(key => {
        const sub: FieldProps & { key: Key } = {
          key,
          ...props,
          schema: properties?.[key] as Schema,
          required: required.includes(key),
          value: innerValue?.[key],
          validity: validity?.properties?.[key],
          onValue: v => {
            setInnerValue(p => ({ ...p, [key]: v }));
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
