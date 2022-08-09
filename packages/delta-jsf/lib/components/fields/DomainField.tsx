import React, { useEffect, useMemo, useState } from 'react';
import { useDefaults, useFormManager, useUpdateEffect } from '../../hooks';
import { FieldProps, Schema } from '../../models';
import { getFieldComponent } from '../../utils';

export function DomainField(props: FieldProps) {
  const {
    schema: { layout: { target } = {} },
    registry,
    registry: {
      utils: { getDomainSchema },
    },
    value,
    onValue,
    onValidity,
  } = props;
  useDefaults(props);
  const maybeSchema = useMemo<Schema | Promise<Schema> | undefined>(
    () => getDomainSchema?.(target),
    [getDomainSchema]
  );
  const [resolvedSchema, setResolvedSchema] = useState<Schema | undefined>();
  useEffect(() => {
    if (maybeSchema instanceof Promise) {
      maybeSchema.then(setResolvedSchema);
    }
  }, [maybeSchema]);
  const targetSchema = (maybeSchema instanceof Promise
    ? resolvedSchema
    : maybeSchema) ?? { type: 'null' };
  const targetProps = {
    ...props,
    schema: targetSchema,
  };
  const TargetField = getFieldComponent(targetProps);
  const manager = useFormManager({
    schema: targetSchema,
    initialValue: value,
    onValue,
    onValidity,
    registry,
    liveValidated: true,
  });
  useUpdateEffect(() => {
    manager.setValue(value);
  }, [value]);
  return <TargetField {...targetProps} />;
}
